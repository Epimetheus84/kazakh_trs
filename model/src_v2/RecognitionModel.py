from __future__ import division
from __future__ import print_function

import sys
import argparse
import cv2
import editdistance
from model.src_v2.DataLoader import DataLoader, Batch
from model.src_v2.Model import Model, DecoderType
from model.src_v2.SamplePreprocessor import preprocess


class FilePaths:
	"""filenames and paths to data"""
	fnCharList = './model/model/charList.txt'
	fnAccuracy = './model/model/accuracy.txt'
	fnTrain = './data/development/kazakh/'
	# fnInfer = './data/development/kazakh/images/42303.png'
	fnInfer = './test.png'
	fnCorpus = './data/corpus.txt'


class RecognitionModel:

	@staticmethod
	def infer(model, fnImg, shape=None):
		"""recognize text in image provided by file path"""
		img = cv2.imread(fnImg, cv2.IMREAD_GRAYSCALE)
		img = img[shape['y0']:shape['y1'], shape['x0']:shape['x1']]
		img = preprocess(img, Model.imgSize)
		batch = Batch(None, [img])
		(recognized, probability) = model.inferBatch(batch, True)
		# print('Recognized:', '"' + recognized[0] + '"')
		# print('Probability:', probability[0])
		return recognized[0]

	@staticmethod
	def main():
		"""main function"""
		# optional command line args

		context = ''

		decoderType = DecoderType.BestPath
		if context == 'beamsearch':
			decoderType = DecoderType.BeamSearch
		elif context == 'wordbeamsearch':
			decoderType = DecoderType.WordBeamSearch

		dumps = ''

		# train or validate on IAM dataset
		if context == 'train' or context == 'validate':
			# load training data, create TF model
			loader = DataLoader(FilePaths.fnTrain, Model.batchSize, Model.imgSize, Model.maxTextLen)

			# save characters of model for inference mode
			open(FilePaths.fnCharList, 'w', encoding='utf-8').write(str().join(loader.charList))

			# save words contained in dataset into file
			open(FilePaths.fnCorpus, 'w', encoding='utf-8').write(str(' ').join(loader.trainWords + loader.validationWords))

			# execute training or validation
			if context == 'train':
				model = Model(loader.charList, decoderType)
				RecognitionModel.train(model, loader)
			elif context == 'validate':
				model = Model(loader.charList, decoderType, mustRestore=True)
				RecognitionModel.validate(model, loader)

		# infer text on test image
		else:
			print(open(FilePaths.fnAccuracy).read())
			model = Model(open(FilePaths.fnCharList, encoding='utf-8').read(), decoderType, mustRestore=True, dump=dumps)
			RecognitionModel.infer(model, FilePaths.fnInfer)

	@staticmethod
	def train(model, loader):
		"""train NN"""
		epoch = 0 # number of training epochs since start
		bestCharErrorRate = float('inf') # best valdiation character error rate
		noImprovementSince = 0 # number of epochs no improvement of character error rate occured
		earlyStopping = 5 # stop training after this number of epochs without improvement
		while True:
			epoch += 1
			print('Epoch:', epoch)

			# train
			print('Train NN')
			loader.trainSet()
			while loader.hasNext():
				iterInfo = loader.getIteratorInfo()
				batch = loader.getNext()
				loss = model.trainBatch(batch)
				print('Batch:', iterInfo[0],'/', iterInfo[1], 'Loss:', loss)

			# validate
			charErrorRate = RecognitionModel.validate(model, loader)

			# if best validation accuracy so far, save model parameters
			if charErrorRate < bestCharErrorRate:
				print('Character error rate improved, save model')
				bestCharErrorRate = charErrorRate
				noImprovementSince = 0
				model.save()
				open(FilePaths.fnAccuracy, 'w').write('Validation character error rate of saved model: %f%%' % (charErrorRate*100.0))
			else:
				print('Character error rate not improved')
				noImprovementSince += 1

			# stop training if no more improvement in the last x epochs
			if noImprovementSince >= earlyStopping:
				print('No more improvement since %d epochs. Training stopped.' % earlyStopping)
				break

	@staticmethod
	def validate(model, loader):
		"""validate NN"""
		print('Validate NN')
		loader.validationSet()
		numCharErr = 0
		numCharTotal = 0
		numWordOK = 0
		numWordTotal = 0
		while loader.hasNext():
			iterInfo = loader.getIteratorInfo()
			print('Batch:', iterInfo[0],'/', iterInfo[1])
			batch = loader.getNext()
			(recognized, _) = model.inferBatch(batch)

			print('Ground truth -> Recognized')
			for i in range(len(recognized)):
				numWordOK += 1 if batch.gtTexts[i] == recognized[i] else 0
				numWordTotal += 1
				dist = editdistance.eval(recognized[i], batch.gtTexts[i])
				numCharErr += dist
				numCharTotal += len(batch.gtTexts[i])
				print('[OK]' if dist==0 else '[ERR:%d]' % dist,'"' + batch.gtTexts[i] + '"', '->', '"' + recognized[i] + '"')

		# print validation result
		charErrorRate = numCharErr / numCharTotal
		wordAccuracy = numWordOK / numWordTotal
		print('Character error rate: %f%%. Word accuracy: %f%%.' % (charErrorRate*100.0, wordAccuracy*100.0))
		return charErrorRate

	@staticmethod
	def get_decoder_type():
		return DecoderType.BestPath

	@staticmethod
	def recognize(input_file, shape):
		decoder_type = RecognitionModel.get_decoder_type()
		print(open(FilePaths.fnCharList, encoding='utf-8').read())
		model = Model(open(FilePaths.fnCharList, encoding='utf-8').read(), decoder_type, mustRestore=True)

		try:
			text = RecognitionModel.infer(model, input_file, shape)
		except TypeError:
			return ''
		except Exception:
			return ''

		return text

