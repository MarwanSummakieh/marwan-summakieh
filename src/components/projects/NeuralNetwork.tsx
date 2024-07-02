"use client";
import React, { useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock: React.FC<{ code: string }> = ({ code }) => (
  <SyntaxHighlighter language="python" style={dracula} className="rounded-lg overflow-x-auto my-4 p-6">
    {code}
  </SyntaxHighlighter>
);

const Equation: React.FC<{ tex: string }> = ({ tex }) => (
  <div className="my-4 text-center">
    <script
      type="math/tex"
      dangerouslySetInnerHTML={{ __html: tex }}
    />
  </div>
);

const NeuralNetworkTutorial: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.Hub.Queue(['Typeset', (window as any).MathJax.Hub]);
    }
  });

  return (
    <div className="font-sans max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 mt-16">Understanding Neural Networks</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p>
          Neural networks are a subset of machine learning modeled after the human brain. They consist of layers of neurons that process input data to produce outputs. This tutorial explores the mathematical foundation and coding implementation of neural networks. 
          Neural networks are used in various applications like image and speech recognition, game playing, and many others.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Basic Concepts</h2>
        <h3 className="text-xl font-bold mb-2">Neurons and Layers</h3>
        <p>
          A neural network is composed of neurons organized in layers:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Input layer:</strong> Where data is fed into the network.</li>
          <li><strong>Hidden layers:</strong> Intermediate layers that process the inputs.</li>
          <li><strong>Output layer:</strong> The final layer that produces the output.</li>
        </ul>
        <p>
          Each connection between neurons has an associated weight that adjusts during the learning process to minimize errors in the output.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Mathematical Operations</h2>
        <h3 className="text-xl font-bold mb-2">Dot Product</h3>
        <p>
          The dot product is a fundamental operation in neural networks, where inputs and their corresponding weights are multiplied and summed:
        </p>
        <Equation tex="y = \sum_{i=1}^n x_i w_i + b" />
        <p>Where:</p>
        <ul className="list-disc list-inside ml-4">
          <li>y is the output</li>
          <li>x_i are the inputs</li>
          <li>w_i are the weights</li>
          <li>b is the bias</li>
        </ul>
        <CodeBlock code={`
import numpy as np

inputs = np.array([1, 2, 3])
weights = np.array([0.2, 0.8, -0.5])
bias = 2

output = np.dot(inputs, weights) + bias
print(output)
        `} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Activation Functions</h2>
        <p>
          Activation functions introduce non-linearity to the model, enabling it to learn complex patterns. Common functions include:
        </p>
        <h3 className="text-xl font-bold mb-2">ReLU (Rectified Linear Unit)</h3>
        <Equation tex="f(x) = \max(0, x)" />
        <CodeBlock code={`
def relu(x):
    return np.maximum(0, x)

inputs = np.array([-1, 2, -0.5, 3])
outputs = relu(inputs)
print(outputs)
        `} />
        <h3 className="text-xl font-bold mb-2">Softmax</h3>
        <Equation tex="softmax(x_i) = \frac{e^{x_i}}{\sum_{j=1}^n e^{x_j}}" />
        <p>
          The softmax function is useful for classification tasks, converting logits into probabilities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Loss Functions</h2>
        <p>
          Loss functions measure how well the neural network&apos;s predictions match the actual data.
        </p>
        <h3 className="text-xl font-bold mb-2">Categorical Cross-Entropy Loss</h3>
        <Equation tex="L = -\sum_{i=1}^C y_i \log(\hat{y_i})" />
        <p>Where:</p>
        <ul className="list-disc list-inside ml-4">
          <li>C is the number of classes</li>
          <li>y_i is the true probability of class i</li>
          <li>ŷ_i is the predicted probability of class i</li>
        </ul>
        <CodeBlock code={`
def categorical_cross_entropy_loss(predictions, targets):
    return -np.sum(targets * np.log(predictions))

predictions = np.array([0.2, 0.6, 0.2])
targets = np.array([0, 1, 0])

loss = categorical_cross_entropy_loss(predictions, targets)
print(loss)
        `} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Training Neural Networks</h2>
        <p>
          Neural networks are typically trained using empirical risk minimization. This involves adjusting the weights to minimize the difference between the predicted output and the actual target values. Techniques such as backpropagation are commonly used to update the weights by calculating gradients and performing gradient descent.
        </p>
        <h3 className="text-xl font-bold mb-2">Backpropagation</h3>
        <p>
          Backpropagation is an algorithm for supervised learning of artificial neural networks using gradient descent. It calculates the gradient of the loss function with respect to each weight by the chain rule, computing the gradient one layer at a time, iterating backward from the last layer to avoid redundant calculations of intermediate terms in the chain rule【62†source】.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. Implementation</h2>
        <p>
          Let&apos;s implement a basic neural network:
        </p>
        <CodeBlock code={`
import numpy as np

class NeuralNetwork:
    def __init__(self):
        self.layers = []

    def add_layer(self, layer):
        self.layers.append(layer)

    def forward(self, inputs):
        for layer in self.layers:
            inputs = layer.forward(inputs)
        return inputs

class Layer:
    def __init__(self, weights, biases):
        self.weights = weights
        self.biases = biases

    def forward(self, inputs):
        return np.dot(inputs, self.weights.T) + self.biases

def softmax(x):
    exp_values = np.exp(x - np.max(x, axis=1, keepdims=True))
    return exp_values / np.sum(exp_values, axis=1, keepdims=True)

# Define the network
network = NeuralNetwork()

# Add a layer
weights1 = np.array([[0.2, 0.8, -0.5], [0.5, -0.91, 0.26], [-0.26, -0.27, 0.17]])
biases1 = np.array([2, 3, 0.5])
layer1 = Layer(weights1, biases1)
network.add_layer(layer1)

# Forward pass
inputs = np.array([[1, 2, 3]])
outputs = network.forward(inputs)
softmax_outputs = softmax(outputs)

print("Network output:", outputs)
print("Softmax output:", softmax_outputs)
        `} />
      </section>

      <section className="mb-8">
        <h2 className="text-Sure, I'll continue from where it was left off.

```tsx
2xl font-bold mb-4">7. Conclusion</h2>
        <p>This tutorial covered the basics of neural networks, including mathematical operations, activation functions, and loss functions. We also implemented a simple neural network in Python. By understanding these fundamental concepts, you can start building more complex neural networks and exploring advanced machine learning techniques.</p>
      </section>
    </div>
  );
};

export default NeuralNetworkTutorial;
