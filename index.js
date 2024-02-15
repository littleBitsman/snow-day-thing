const fs = require('fs')
const brain = new (require('brain.js').NeuralNetwork)({
    hiddenLayers: [4],
    inputSize: 2,
    outputSize: 1
}).fromJSON(JSON.parse(fs.readFileSync('model.json', 'utf8')))
const prompt = require('prompt')
prompt.message = ''

async function main() {
    while (true) {
        const { inches, days } = await prompt.get({
            properties: {
                inches: {
                    required: true,
                    message: 'Inches should be a number',
                    pattern: /^(?!\D)\d+(?!\D)$/g,
                    description: 'Inches of snow'
                },
                days: {
                    required: true,
                    message: 'Already used snow days should be a number',
                    pattern: /^(?!\D)\d+(?!\D)$/g,
                    description: 'Snow days you already had'
                }
            }
        })
        const res = Math.floor(brain.run([parseFloat(inches), parseInt(days)])[0] * 10000) / 100
        console.log(`Prediction: ${res}% chance of snow day`)
    }
}

main()