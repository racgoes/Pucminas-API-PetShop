const animalsDataTypes = {"name":["dog","cat","fish","parrot"]}

// Função para validar o corpo de entrada
function validateAnimalInput(animal) {
    // Verifica se o corpo de entrada possui as propriedades necessárias
    if (!animal.name || !animal.type || !animal.age || !animal.tutor) {
        return false;
    }

    // Verifica se o tipo de animal é válido
    const validTypes = animalsData.types.map(type => type.name);
    if (!validTypes.includes(animal.type)) {
        return false;
    }

    // Verifica se a idade do animal é um número positivo
    if (typeof animal.age !== 'number' || animal.age <= 0) {
        return false;
    }


    return true;
}

function validateAnimalUpdate(animal) {
    // Verifica se o corpo de entrada possui as propriedades necessárias
    if (!animal.name || !animal.type || !animal.age || !animal.tutor) {
        return false;
    }

    return true;
}

module.exports = validateAnimalInput, validateAnimalUpdate;