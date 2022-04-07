function tagMapping(object) {
    let mappedTags = [];
    if(object.hasOwnProperty('tags') && Array.isArray(object.tags)){
        object.tags.forEach(t => {
            try {
                mappedTags.push(JSON.parse(t)['@id']);
            } catch (e) {
                mappedTags.push(t['@id'])
            }
        })
        object.tags = mappedTags;
        return object
    }
    return null;
}

export default tagMapping;