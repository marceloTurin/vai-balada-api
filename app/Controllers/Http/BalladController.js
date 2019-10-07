'use strict'

const Ballad = use('App/Models/Ballad')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ballads
 */
class BalladController {
  /**
   * Show a list of all ballads.
   * GET ballads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
   
    const { latitude, longitude } = request.all()

    const ballads = Ballad.query()
    .with('images')
    .nearBy(latitude, longitude, 10)
    .fetch()

    return ballads



  }

  /**
   * Render a form to be used for creating a new ballad.
   * GET ballads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new ballad.
   * POST ballads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude'
    ])
  
    const ballad = await Ballad.create({ ...data, user_id: id })
  
    return ballad
  }

  /**
   * Display a single ballad.
   * GET ballads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {

    const ballad = await Ballad.findOrFail(params.id)

    await ballad.load('images')

    return ballad
  }

  /**
   * Render a form to update an existing ballad.
   * GET ballads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update ballad details.
   * PUT or PATCH ballads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const ballad = await Ballad.findOrFail(params.id)

    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    ballad.merge(data)
  
    await ballad.save()
  
    return ballad
  }

  /**
   * Delete a ballad with id.
   * DELETE ballads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const ballad = await Ballad.findOrFail(params.id)

    if (ballad.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await ballad.delete()
    }
}

module.exports = BalladController
