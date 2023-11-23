import express from 'express'
import * as dbBridge from '../db/bridges.ts'
import * as dbFavBridge from '../db/favourite-bridges.ts'

const router = express.Router()

// -- MVP -- //

//GENERAL BRIDGES ROUTES

// GET /api/v1/bridges
router.get('/', async (req, res) => {
  try {
    const bridges = await dbBridge.getAllBridgesDb()
    res.json(bridges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// GET /api/v1/bridges/:id (Single Bridge)
router.get('/:id', async (req, res) => {
  const bridgeId = Number(req.params.id)
  try {
    const bridge = await dbBridge.getBridgeByIdDb(bridgeId)
    res.json(bridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//FAVOURITE BRIDGES ROUTES
// GET /api/v1/bridges/fav
router.get('/fav', async (req, res) => {
  try {
    const favBridges = await dbFavBridge.getFavBridgesDb()
    res.json(favBridges)
    console.log(favBridges)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

// POST /api/v1/bridges/fav
router.post('/fav', async (req, res) => {
  try {
    console.log("I'm being called")
    const bridge = req.body
    console.log(bridge)
    const addedBridge = await dbFavBridge.addFavBridgeDb(bridge)
    res.json(addedBridge)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something went wrong')
  }
})

//DELETE /api/v1/bridges/fav/:id
router.delete('/fav/:id', async (req, res) => {
  {
    const id = parseInt(req.params.id)
    if (isNaN(id)) {
      res.status(400).send('Bad Request: ID must be a number')
      return
    }
    try {
      await dbFavBridge.deleteFavBridgeDb(id)
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.status(500).send('Could not delete favourite bridge!')
    }
  }
})

// -- STRETCH -- //

export default router

//TEST
