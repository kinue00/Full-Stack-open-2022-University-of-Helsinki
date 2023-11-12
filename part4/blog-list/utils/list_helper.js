const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((total, currentValue) => {
        return total + currentValue.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    const getFav = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }
    const tmp = blogs.reduce(getFav)
    const favBlog = {
        title: tmp.title,
        author: tmp.author,
        likes: tmp.likes,
    }
    return favBlog
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    const groupedBlogs = _.groupBy(blogs, 'author')
    const authorBlogs = _.map(groupedBlogs, (blogs, author) => ({ author, blogs: blogs.length }))
    return _.maxBy(authorBlogs, 'blogs')
}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    const groupedBlogs = _.groupBy(blogs, 'author')
    const authorLikes = _.map(groupedBlogs, (blogs, author) => ({ author, likes: _.sumBy(blogs, 'likes') }))
    return _.maxBy(authorLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,   
    mostBlogs,
    mostLikes,
}
