import {useMemo} from "react";

export const useSortedUsers = (users, sort) => {

    const sortedUsers = useMemo(() => {
        if (sort) {
            return [...users].sort((a, b) => {
                
            })
        }
        return users;
    }, [sort, users])

    return sortedUsers;
}

export const useMessages = (users, query) => {
    const sortedUsers = useSortedUsers(users, query);

    const sortedAndSearchedUsers = useMemo(() => {

        if (query != '') {
            //return users.filter(user => (user.status_id != null ? user.status_id.name : '') === query)  //post2
            return users.filter(conver => conver.members.includes(query))
        }
        return users;
    }, [query, users]) //post2

    return sortedAndSearchedUsers;
}