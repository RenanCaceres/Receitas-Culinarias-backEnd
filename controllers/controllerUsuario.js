async postSalvarHabilidades(req, res) {

    try {

        const alunoId = req.session.alunoId;

        let habilidades = req.body.habilidades || [];

        // SE VIER APENAS UMA HABILIDADE
        if (!Array.isArray(habilidades)) {
            habilidades = [habilidades];
        }

        // REMOVE AS ANTIGAS
        await db.AlunoHabilidade.destroy({
            where: { usuarioId: alunoId }
        });

        const registros = [];

        for (const id of habilidades) {

            const nivel = Number(req.body[`nivel_${id}`] || 0);

            registros.push({
                usuarioId: alunoId,
                habilidadeId: Number(id),
                nivel: nivel
            });

        }

        // SALVA
        if (registros.length > 0) {

            await db.AlunoHabilidade.bulkCreate(registros);

        }

        res.redirect('/minhasHabilidades');

    } catch (err) {

        console.log(err);

        res.redirect('/minhasHabilidades');

    }
}