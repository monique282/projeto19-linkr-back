import db from "../database/database.connection.js";

export async function getHashtagsDB(){
    const query = `
        SELECT COUNT(hashtags.name) AS "hashtagCount", hashtags.name AS hashtag, hashtags.id AS id
            FROM hashtags 
            JOIN posts ON hashtags."postId" = posts.id
            GROUP BY hashtags.name, hashtags.id
            ORDER BY "hashtagCount" DESC
            LIMIT 10;
    
    `
    return db.query(query);
}