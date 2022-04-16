import tensorflow as tf
print("TensorFlow version:", tf.__version__)

# With `dilation_rate` as 2.
input_shape = (1, 28, 28, 3)
x = tf.random.normal(input_shape)
y = tf.keras.layers.Conv2D(2, 3, activation='relu', dilation_rate=2, input_shape=(28, 28, 1))(x)
print(y.shape)

# train_sample = x_train[:1]
# predictions = y(train_sample).numpy()
# print(predictions)
