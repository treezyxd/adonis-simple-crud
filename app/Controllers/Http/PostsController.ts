import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {

  async index({}: HttpContextContract) {
    let allPosts = await Post.all()
    return allPosts
  }

  async store({request}: HttpContextContract) {
    const myData = request.only(['title', 'content'])
    const postagem = await Post.create(myData)
    return postagem
  }

  async show({params, response}: HttpContextContract) {
    const post_id = params.id
    const myPost = await Post.find(post_id)

    if(!myPost) {
      response.notFound()
    }
    
    return myPost
  }

  async destroy({params, response}: HttpContextContract) {
    const { id } = params

    const myPost = await Post.find(id)

    if(!myPost) {
      return response.notFound()
    }

    await myPost.delete()
  }

  async update({params, request, response}: HttpContextContract) {
    const { id } = params
    const myPost = await Post.find(id)
    
    if(!myPost) {
      return response.notFound()
    }
    
    const myData = request.only(['title', 'content'])

    myPost.merge(myData)

    await myPost.save()

    return myPost
    
  }
}
