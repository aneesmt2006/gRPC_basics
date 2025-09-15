const client = require('./client')

client.getAllNews({},(error,news)=>{

    if(error){
        throw error
    }

    console.log('get News',news)
})

client.addNews({},(error,news)=>{
    if(error){
        throw error
    }

    console.log("succesfully created news",news)
})

client.deleteNews({},(error,news)=>{
    if(error){
        throw error
    }

    console.log("succesfully deleted the news")
})

client.editNews({},(error,news)=>{
    if(error){
        throw error
    }

    console.log("news edited....")
})