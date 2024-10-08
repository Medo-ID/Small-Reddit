import CategoriesFilter from './components/categoryFilter/CategoriesFilter.jsx'
import Header from './components/header/Header.jsx'
import PostList from './components/postList/PostList.jsx'
import RateLimitPopup from './components/rateLimitPopup/RateLimitPopup.jsx'

function App(){
  return (
    <>
      <Header/>
      <div className='flex flex-col-reverse md:flex-row justify-evenly items-start gap-2'>
        <RateLimitPopup />
        <PostList />
        <CategoriesFilter />
      </div>
    </>
  )
}

export default App