// import
import styles from "./PostList.module.scss"
import PostItem from "./PostItem"
import EditPost from "./EditPost"

// composant fonctionnel
function PostList({ postList, updatePost, deletePost }) {
	return (
		<section className={`${styles.postList}`}>
			{postList.length ? (
				<ul>
					{postList.map((post) =>
						post.edit ? (
							<EditPost key={post._id} post={post} updatePost={updatePost} />
						) : (
							<PostItem
								key={post._id}
								post={post}
								updatePost={updatePost}
								deletePost={deletePost}
							/>
						)
					)}
				</ul>
			) : (
				<p className={`${styles.emptyFeed}`}>
					Aucune publication pour le moment.
				</p>
			)}
		</section>
	)
}

// export du composant
export default PostList
