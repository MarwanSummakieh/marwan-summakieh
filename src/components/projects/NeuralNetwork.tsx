import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const NeuralNetwork: React.FC = () => {
  const codeStyle: React.CSSProperties = {
    padding: '1em',
    backgroundColor: '#2d2d2d',
    border: '1px solid #444',
    borderRadius: '5px',
    margin: '1em 0'
  };

  const codeBlocks = [
    `import numpy as np

# Input data (X) and weights (W)
X = np.array([1, 2, 3])
W = np.array([0.1, 0.2, 0.3])

# Weighted sum (dot product)
Z = np.dot(X, W)
print("Weighted sum (Z):", Z)`,
    `# Sigmoid activation function
def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# Apply activation function
A = sigmoid(Z)
print("Activated output (A):", A)`,
    `# Actual output (Y)
Y = np.array([0.5])

# Mean Squared Error (MSE) loss function
def mse_loss(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

# Calculate loss
loss = mse_loss(Y, A)
print("Loss:", loss)`,
    `# Derivative of the Sigmoid function
def sigmoid_derivative(z):
    return sigmoid(z) * (1 - sigmoid(z))

# Calculate gradients
dZ = A - Y
dW = np.dot(X.T, dZ * sigmoid_derivative(Z))

# Update weights
learning_rate = 0.01
W -= learning_rate * dW
print("Updated weights (W):", W)`
  ];

  return (
    <div className="p-10 mt-12">
      <h1 className="text-4xl font-bold mb-8">Neural Network Tutorial</h1>

      <h2 className="text-2xl font-bold mb-4">Introduction to Neural Networks</h2>
      <p className="mb-4">
        A neural network is a series of algorithms that attempts to recognize underlying relationships in a set of data
        through a process that mimics the way the human brain operates. It consists of layers of neurons, where each
        neuron in one layer is connected to every neuron in the next layer.
      </p>

      <h2 className="text-2xl font-bold mb-4">Step 1: Forward Propagation</h2>
      <p className="mb-4">
        Forward propagation is the process of passing input data through the neural network to obtain an output. Let's
        start with the basics:
      </p>
      <div style={codeStyle}>
        <SyntaxHighlighter language="python" style={dracula}>
          {codeBlocks[0]}
        </SyntaxHighlighter>
      </div>
      <p className="mb-4">
        This code calculates the weighted sum of the inputs using the dot product of input data (X) and weights (W).
      </p>

      <h2 className="text-2xl font-bold mb-4">Step 2: Activation Function</h2>
      <p className="mb-4">
        Activation functions introduce non-linearity into the network. One commonly used activation function is the Sigmoid function:
      </p>
      <div style={codeStyle}>
        <SyntaxHighlighter language="python" style={dracula}>
          {codeBlocks[1]}
        </SyntaxHighlighter>
      </div>
      <p className="mb-4">
        This code applies the Sigmoid activation function to the weighted sum (Z) to obtain the activated output (A).
      </p>

      <h2 className="text-2xl font-bold mb-4">Step 3: Loss Calculation</h2>
      <p className="mb-4">
        The loss function measures the difference between the predicted output and the actual output. Here, we use the Mean Squared Error (MSE) as an example:
      </p>
      <div style={codeStyle}>
        <SyntaxHighlighter language="python" style={dracula}>
          {codeBlocks[2]}
        </SyntaxHighlighter>
      </div>
      <p className="mb-4">
        This code calculates the MSE loss between the actual output (Y) and the predicted output (A).
      </p>

      <h2 className="text-2xl font-bold mb-4">Step 4: Backpropagation</h2>
      <p className="mb-4">
        Backpropagation is the process of updating the weights to minimize the loss. This involves calculating the gradients of the loss with respect to the weights:
      </p>
      <div style={codeStyle}>
        <SyntaxHighlighter language="python" style={dracula}>
          {codeBlocks[3]}
        </SyntaxHighlighter>
      </div>
      <p className="mb-4">
        This code calculates the gradients and updates the weights using gradient descent.
      </p>

      <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
      <p className="mb-4">
        Congratulations! You've learned the basic steps of how a neural network works: forward propagation, activation functions, loss calculation, and backpropagation. This is a simplified example, and real-world neural networks involve many more layers and neurons.
      </p>
    </div>
  );
};

export default NeuralNetwork;
