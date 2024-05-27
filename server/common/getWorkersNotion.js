//notion api
require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

//получить id блока заданной страницы по id
module.exports = async function getWorkersNotion() {
    try {
        const response = await notion.databases.query({
            database_id: databaseWorkerId
        });

        const responseResults = response.results.map((page) => {
            return {
               id: page.id,
               fio: page.properties.Name.title[0]?.plain_text,
               tgId: page.properties.Telegram.number
            };
        });

        //console.log(responseResults);
        return responseResults;
    } catch (error) {
        console.error(error.message)
    }
}