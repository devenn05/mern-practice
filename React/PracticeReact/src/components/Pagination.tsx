import React, { useEffect, useState } from 'react'

interface Post{
    id: number, 
    title: string
}

const Pagination = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState('')
    const pageLimit: number = 10;

    useEffect(()=>{
        const fetchPosts = async () =>{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(res=> res.json()).then(data=> setPosts(data))
        }
        fetchPosts()
    }, [])

    const filteredPosts = posts.filter(post=>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const indexOfLastItem: number = currentPage * pageLimit;
    const indexOfFirstItem: number = indexOfLastItem - pageLimit;

    const currentPosts = filteredPosts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(posts.length / pageLimit)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
      setSearchQuery(e.target.value)
      setCurrentPage(1)
    }

  return (
    <div>

      <input type="text" value={searchQuery}onChange={handleSearch}/>
      <ul>
        {currentPosts.map(post => (
          <li key={post.id}>
            <strong>{post.id}</strong> - {post.title}
          </li>
        ))}
      </ul>
      {filteredPosts.length === 0 && <p>No posts found matching "{searchQuery}"</p>}
      <div>
        <button disabled={currentPage===1} onClick={()=>setCurrentPage(prev=> prev - 1)}>Previous</button>
        <button disabled={currentPage===totalPages} onClick={()=>setCurrentPage(prev=> prev + 1)}>Next</button>
      </div>
    </div>
  )
}

export default Pagination
