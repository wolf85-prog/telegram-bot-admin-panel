//notion api
require("dotenv").config();
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseWorkerId = process.env.NOTION_DATABASE_WORKERS_ID

//получить id блока заданной страницы по id
module.exports = async function getWorkersNotion() {
    try {

        let results = []

        let data = await notion.databases.query({
            database_id: databaseWorkerId
        });

        results = [...data.results]

        while(data.has_more) {
            data = await notion.databases.query({
                database_id: databaseWorkerId,
                start_cursor: data.next_cursor,
            }); 

            results = [...results, ...data.results];
        }

        const workers = results.map((worker) => {
            return {
               id: worker.id,
               fio: worker.properties.Name.title[0]?.plain_text,
               tgId: worker.properties.Telegram.number,
               phone: worker.properties.Phone.phone_number,
               age: worker.properties.Age.date,
               city: worker.properties.City.rich_text[0]?.plain_text,
               spec: worker.properties.Specialization.multi_select,
               comment: worker.properties["Комментарии"].rich_text[0]?.plain_text,
               reyting: worker.properties["Рейтинг"].rich_text[0]?.plain_text,
               merch: worker.properties.Merch.multi_select,
               comteg: worker.properties["КомТег"].multi_select,
               rank: worker.properties["Ранг"].number,
               passport: worker.properties.Passport.rich_text[0]?.plain_text,                                         
            };
        });

        return workers;
    } catch (error) {
        console.error(error.message)
    }
}