var brain = new (require('brain.js').NeuralNetwork)({
    hiddenLayers: [50],
    inputSize: 2,
    outputSize: 1
})
const fs = require('fs')
if (fs.existsSync('model.json')) {
    brain = brain.fromJSON(require('./model.json'))
} else {
    brain.train(require('./trainingData.json'))
    fs.writeFileSync('model.json', JSON.stringify(brain.toJSON()))
}
const prompt = require('prompt')
prompt.message = ''

async function main() {
    while (true) {
        const { inches, days } = await prompt.get({
            properties: {
                inches: {
                    required: true,
                    message: 'Inches should be a positive number',
                    description: 'Inches of snow',
                    conform: inp => {
                        if (inp == 'exit') exit(0)
                        return !isNaN(parseFloat(inp)) && parseFloat(inp) >= 0
                    }
                },
                days: {
                    required: true,
                    message: 'Already used snow days should be a positive integer',
                    description: 'Snow days you already had',
                    conform: inp => {
                        if (inp == 'exit') exit(0)
                        return !isNaN(parseInt(inp)) && parseInt(inp) >= 0
                    }
                }
            }
        })
        const res = Math.floor(brain.run([parseFloat(inches), parseInt(days)])[0] * 10000) / 100
        console.log(`Prediction: ${res}% chance of snow day`)
    }
}

main()