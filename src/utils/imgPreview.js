
function getURlFile(imageHashId) {
    if(!imageHashId) return "";

    return (
        URL.createObjectURL(imageHashId)
    )
}

export default getURlFile;