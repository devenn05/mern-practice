import React, { useEffect, useState } from 'react'

interface Post{
    id: number, 
    title: string
}

const Pagination = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageLimit: number = 10;

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(res=> res.json()).then(data=> setPosts(data))
        }
        fetchPosts()
    }, [])

    const indexOfLastItem: number = currentPage * pageLimit;
    const indexOfFirstItem: number = indexOfLastItem - pageLimit;

    const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(posts.length / pageLimit)
  return (
    <div>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id}>
            <strong>{post.id}</strong> - {post.title}
          </li>
        ))}
      </ul>

      <div>
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(prev=> prev - 1)}>Previous</button>
        <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(prev=> prev + 1)}>Next</button>
      </div>
    </div>
  )
}

export default Pagination
