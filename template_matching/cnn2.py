import os

import tensorflow as tf
import numpy as np

print("TensorFlow version:", tf.__version__)
os.environ["CUDA_VISIBLE_DEVICES"] = ""


class epochCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs=None):
        if logs is None:
            logs = {}
        if logs.get('acc') > 0.995:
            print("\nReached 99.5% accuracy so cancelling training!")
            self.model.stop_training = True


mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = x_train.reshape(x_train.shape[0], x_train.shape[1], x_train.shape[2], 1)
x_train = x_train / 255.0
x_test = x_test.reshape(x_test.shape[0], x_test.shape[1], x_test.shape[2], 1)
x_test = x_test / 255.0

y_train = tf.one_hot(y_train.astype(np.int32), depth=10)
y_test = tf.one_hot(y_test.astype(np.int32), depth=10)

input_shape = (28, 28, 1)

batch_size = 64
num_classes = 10
epochs = 1

activation = 'relu'


class MyDenseLayer(tf.keras.layers.Layer):
    def __init__(self, num_outputs):
        super(MyDenseLayer, self).__init__()
        self.constants = [100, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        self.num_outputs = num_outputs

    def build(self, input_shape):
        pass

    def call(self, inputs):
        print(inputs)
        return tf.add(inputs, self.constants)


def softmax(x):
    max = np.max(x,axis=1,keepdims=True) #returns max of each row and keeps same dims
    e_x = np.exp(x - max) #subtracts each row with its max value
    sum = np.sum(e_x,axis=1,keepdims=True) #returns sum of each row and keeps same dims
    f_x = e_x / sum
    return f_x


model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(20, 3, dilation_rate=2, activation=activation, input_shape=input_shape),
    tf.keras.layers.MaxPool2D(),  # разобраться
    tf.keras.layers.Conv2D(50, 3, dilation_rate=2, activation=activation),
    tf.keras.layers.MaxPool2D(),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(500),
    tf.keras.layers.Dense(num_classes),
    # MyDenseLayer(num_classes),
    # tf.keras.layers.Softmax(),
    # tf.keras.layers.Flatten()
])

# model = tf.keras.models.Sequential([
#     tf.keras.layers.Conv2D(32, (5, 5), padding='same', activation='relu', input_shape=input_shape),
#     tf.keras.layers.Conv2D(32, (5, 5), padding='same', activation='relu'),
#     tf.keras.layers.MaxPool2D(),
#     tf.keras.layers.Dropout(0.25),
#     tf.keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
#     tf.keras.layers.Conv2D(64, (3, 3), padding='same', activation='relu'),
#     tf.keras.layers.MaxPool2D(strides=(2, 2)),
#     tf.keras.layers.Dropout(0.25),
#     tf.keras.layers.Flatten(),
#     tf.keras.layers.Dense(128, activation='relu'),
#     tf.keras.layers.Dropout(0.5),
#     tf.keras.layers.Dense(num_classes, activation='softmax')
# ]) # [7 2 1 0 4 1 ... 4 5 6]

print([1] * 10)

model.compile(optimizer=tf.keras.optimizers.RMSprop(epsilon=1e-08), loss='categorical_crossentropy', metrics=['acc'])

callbacks = epochCallback()

history = model.fit(x_train, y_train,
                    batch_size=batch_size,
                    epochs=epochs,
                    validation_split=0.1,
                    callbacks=[callbacks])

test_loss, test_acc = model.evaluate(x_test, y_test)

Y_pred = model.predict(x_test)
Y_pred_0 = Y_pred[0]
Y_pred_asd = softmax(Y_pred[0])
print(Y_pred_asd)
# Convert predictions classes to one hot vectors
Y_pred_classes = np.argmax(Y_pred, axis=1)
# Convert testing observations to one hot vectors
Y_true = np.argmax(y_test, axis=1)
print(Y_pred, Y_pred_classes)
