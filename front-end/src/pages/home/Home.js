// import
import styles from "./Home.module.scss"
import AddPost from "./components/AddPost"
import PostList from "./components/PostList"
import { useOutletContext } from "react-router-dom"

// composant fonctionnel
function Home() {
	const [postList, setPostList] = useOutletContext()

	// ajout de la nouvelle publication à la liste existante
	function addPost(newPost) {
		setPostList([...postList, newPost])
	}

	// remplace l'ancienne publication par la publication mise à jour
	function updatePost(updatedPost) {
		setPostList(
			postList.map((post) =>
				post._id === updatedPost._id ? updatedPost : post
			)
		)
	}

	// récupération de la liste des publications sans la publication supprimée
	function deletePost(_id) {
		setPostList(postList.filter((p) => p._id !== _id))
	}

	return (
		<main className={`${styles.home}`}>
			<AddPost addPost={addPost} />
			<PostList
				postList={postList}
				updatePost={updatePost}
				deletePost={deletePost}
			/>
		</main>
	)
}

// export du composant
export default Home
