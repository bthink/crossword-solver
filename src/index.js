import express from 'express'
import multer from 'multer'
import { processImage } from './services/imageProcessor.js'
import { solveCrossword } from './services/crosswordSolver.js'
import { generateSolution } from './services/solutionGenerator.js'
import { config } from './config.js'

const app = express()
const upload = multer({ dest: 'uploads/' })

app.post('/solve', upload.single('crossword'), async (req, res) => {
  try {
    const { file } = req
    if (!file) throw new Error('No file uploaded')

    // Extract crossword structure and clues
    const crosswordData = await processImage(file.path)
    
    // Solve using ChatGPT
    const solution = await solveCrossword(crosswordData)
    
    // Generate solution image
    const solutionImage = await generateSolution(crosswordData, solution)
    
    res.json({ 
      solution,
      solutionImage
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
}) 