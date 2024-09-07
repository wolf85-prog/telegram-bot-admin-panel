// src/components/TagsInput.js
import React, { useState } from 'react'
import tagCl from './TagsInput.module.css'

const TagsInput = ({speclist, setSpeclist}) => {
    //const [tags, setTags] = useState([])
    
    //console.log("speclist: ", speclist.split(','))

    function handleKeyDown(e){
        // If user did not press enter key, return
        if(e.key !== 'Enter') return
        // Get the value of the input
        const value = e.target.value
        // If the value is empty, return
        if(!value.trim()) return
        // Add the value to the tags array
        setSpeclist([...speclist, value])
        // Clear the input
        e.target.value = ''
    }

    function removeTag(index){
        setSpeclist(speclist.filter((el, i) => i !== index))
    }
    
    return (
        <div className={tagCl.tagsInputContainer}>
            { speclist.map((tag, index) => (
                <div key={index+1} className={tagCl.tagItem}>{/* One hardcoded tag for test */}
                    <span className={tagCl.text}>{tag}</span>
                    <span className={tagCl.close} onClick={() => removeTag(index)}>&times;</span>
                </div>
            )) }

            <input type="text" onKeyDown={handleKeyDown} className={tagCl.tagsInput} placeholder="Добавить тег" />
        </div>
    )
}

export default TagsInput