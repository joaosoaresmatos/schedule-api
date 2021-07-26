
module.exports = {
    async getAll(mysqlConection){
        try {
			let query =
                `SELECT `+
                    `id `+
                    `name `+
                `FROM cefetmg.department `+
                `WHERE deleted_at is null;`

            return await mysqlConection.query(query)
        } catch (err) {
            throw new Error(`Problema ao encontrar departamento -> ${err.toString()}`)
        }
    }
}
