import {
  likesDB,
  likesUser,
  repostsLikesDB,
  userLikesReposts
} from "../repositories/likes.repository.js";
import { followingStatusDB } from "../repositories/posts.repository.js";

export async function getLikes(req, res) {
  const { userId } = res.locals.user;
  try {
    const likes = await likesDB();
    const followStatus = await followingStatusDB(userId);
    const reposts = await repostsLikesDB();
    let response = [];
    let status = "not following";

    if (followStatus.followedIds.length > 0) {
      const followedIds = new Set(followStatus.followedIds);
      response = likes.rows.filter((post) => followedIds.has(post.userId));
      response.push(
        ...reposts.rows.filter((post) => followedIds.has(post.userId))
      );
      response.sort((a, b) => b.createdAt - a.createdAt);
      if (response.length === 0) {
        status = "following";
      }
    }

    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getLikesByUser(req, res) {
  const { id } = req.params;
  const { userId } = res.locals.user;
  try {
    const likes = await likesUser(id);
    const reposts = await userLikesReposts(id)

    let response = [];
    response.push(...likes.rows);
    response.push(...reposts.rows);
    response.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
