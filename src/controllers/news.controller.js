//código não entendido//
//tentando
//código entendido
//crie um middleware de validação para o title, text, banner quando tever tempo
import { createService, findAllService, countNews, topNewsService,findByIdService, searchByTitleService, byUserService, updateService, eraseService } from "../services/news.service.js"

export const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        
        if (!title ||!text ||!banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })
        res.send(201)
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

export const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5
        }

        if(!offset){
            offset = 0
        }

        const news = await findAllService(offset, limit)
        const total = await countNews()
        const currentUrl = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit${limit}$offset=${previous}`: null;


        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" });
        }
        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(item => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            }))
        }       ) 
        
    } catch (err) {
        req.status(500).send({ message: err.message })
    }
}

export const topNews = async (req, res) => {
    const news = await topNewsService()

    if (!news) {
        return res.status(400).send({ message: "There are no registered news" });
    }
    res.send({
        news: {
            id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            name: news.user.name,
            username: news.user.username,
            userAvatar: news.user.avatar,
        }
    })
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params

        const news = await findByIdService(id)

        return res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                username: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (err) {
        req.status(500).send({ message: err.message })
    }
}

export const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query
        
        const news = await searchByTitleService(title)

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no posts with this title" })
        }

        return res.send({
            results: news.map((item ) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            })),
        })
    

    } catch (err) {
        res.status(400).send({ message: "There are no registered news" });
    }
}

export const byUser = async (req, res) => {
    try {
        const id = req.userId

        const news = await byUserService(id)
        
        return res.send({
            results: news.map((item) => ({
                id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                name: item.user.name,
                username: item.user.username,
                userAvatar: item.user.avatar,
            })),
        })
    } catch (err) {
        res.status(400).send({ message: err.message })
    }
}

export const update = async (req, res) => {
    try {
        const { title, text, banner } = req.body
        const { id } = req.params

        if (!title ||!text ||!banner) {
            return res.status(400).send({ message: "Submit all fields for registration" })
        }

        const news = await findByIdService(id)

        if (String(news.user._id) !== req.userId) {
            res.status(400).send({ message: "You didn't update this News" })
        }

        await updateService(id, title, text, banner)

        return res.send({ message: "Post successfully updated!" })

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export const erase = async (req, res) => {
    try {
        const { id } = req.params

        const news = await findByIdService(id)

        if (String(news.user._id) !== req.userId) {
            res.status(400).send({ message: "You didn't delete this post" })
        }

        await eraseService(id)

        return res.status(500).send({ message: "News successfully deleted!" })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}