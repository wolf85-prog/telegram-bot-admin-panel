//notion api
require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

//получить id блока заданной страницы по id
module.exports = async function getWorkersNotion100s() {
    try {

        let response = await notion.databases.query({
            database_id: databaseWorkerId,
        }); 

        const workers = response.results.map((page) => {
            return {
                id: page.id,
                fio: page.properties.Name.title[0]?.plain_text,
                tgId: page.properties.Telegram.number,
                phone: page.properties.Phone.phone_number,
                age: page.properties.Age.date,
                city: page.properties.City[0]?.plain_text,
                spec: page.properties.Specialization.multi_select,
                comment: page.properties["Комментарии"].rich_text[0]?.plain_text,
                reyting: page.properties["Рейтинг"].rich_text[0]?.plain_text,
                merch: page.properties.Merch.multi_select,
                comteg: page.properties["КомТег"].multi_select,
                rank: page.properties["Ранг"].number,
                passport: page.properties.Passport.rich_text[0]?.plain_text,
                skill: page.properties.Skill.multi_select,
                //image: page.properties["Профиль"].files[0]?.file.url,
                profile: page.properties["Профиль"],
            };
        });

        const newObj = {
            workers: workers,
            cursor: response.next_cursor,
            more: response.has_more
        }

        return newObj;
    } catch (error) {
        console.error(error.message)
    }
}