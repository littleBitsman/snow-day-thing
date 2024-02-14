const brain = new (require('brain.js').NeuralNetwork)({
    hiddenLayers: [4]
})
const prompt = require('prompt')
prompt.message = ''

brain.train(JSON.parse(require('fs').readFileSync('trainingData.json', 'utf8')))

async function main() {
    while (true) {
        const { inches, days } = await prompt.get({
            properties: {
                inches: {
                    required: true,
                    message: 'Inches should be a number',
                    pattern: /(?!\D)\d+(?!\D)/g,
                    description: 'Inches of snow'
                },
                days: {
                    required: true,
                    message: 'Already used snow days should be a number',
                    pattern: /(?!\D)\d+(?!\D)/g,
                    description: 'Snow days you already had'
                }
            }
        })
        const res = Math.floor(brain.run([parseInt(inches), parseInt(days)])[0] * 10000) / 100
        console.log(`Prediction: ${res}% chance of snow day`)
    }
}

main()