import express from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('TP BASE RECHERCHE'))

/***************************************
 * 
 * CRUD CHERCHEUR
 * 
 * **************************************/

app.post('/chercheurs', async (req, res) => {
    let { NC, NOM, PRENOM, NE } = req.body;
    NC = parseInt(NC);
    NE = parseInt(NE);
    console.log(req.body)
    try {
        const newChercheur = await prisma.chercheur.create({
            data: { NC, NOM, PRENOM, NE }
        });
        res.status(201).json(newChercheur);
    } catch (error) {
        console.error('Erreur lors de la création du chercheur :', error);
        res.status(500).send('Erreur lors de la création du chercheur');
    }
});

app.get('/chercheurs', async (req, res) => {
    try {
        const chercheurs = await prisma.chercheur.findMany();
        res.json(chercheurs);
    } catch (error) {
        console.error('Erreur lors de la récupération des chercheurs :', error);
        res.status(500).send('Erreur lors de la récupération des chercheurs');
    }
});

app.get('/chercheurs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const chercheur = await prisma.chercheur.findUnique({
            where: { NC: parseInt(id) }
        });
        if (!chercheur) {
            return res.status(404).send('Chercheur non trouvé');
        }
        res.json(chercheur);
    } catch (error) {
        console.error(`Erreur lors de la récupération du chercheur avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la récupération du chercheur avec l'ID ${id}`);
    }
});

app.patch('/chercheurs/:id', async (req, res) => {
    const { id } = req.params;
    let { NOM, PRENOM, NE } = req.body;
    NE = parseInt(NE)
    try {
        const updatedChercheur = await prisma.chercheur.update({
            where: { NC: parseInt(id) },
            data: { NOM, PRENOM, NE }
        });
        res.json(updatedChercheur);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du chercheur avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la mise à jour du chercheur avec l'ID ${id}`);
    }
});

app.delete('/chercheurs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.chercheur.delete({
            where: { NC: parseInt(id) }
        });
        res.send('Chercheur supprimé avec succès');
    } catch (error) {
        console.error(`Erreur lors de la suppression du chercheur avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la suppression du chercheur avec l'ID ${id}`);
    }
});

/***************************************
 * 
 * CRUD EQUIPE
 * 
 * **************************************/

app.post('/equipes', async (req, res) => {
    let { NE, NOM } = req.body;
    NE = parseInt(NE)
    try {
        const newEquipe = await prisma.equipe.create({
            data: { NE, NOM }
        });
        res.status(201).json(newEquipe);
    } catch (error) {
        console.error('Erreur lors de la création de l\'équipe :', error);
        res.status(500).send('Erreur lors de la création de l\'équipe');
    }
});

app.get('/equipes', async (req, res) => {
    try {
        const equipes = await prisma.equipe.findMany();
        res.json(equipes);
    } catch (error) {
        console.error('Erreur lors de la récupération des équipes :', error);
        res.status(500).send('Erreur lors de la récupération des équipes');
    }
});

app.get('/equipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const equipe = await prisma.equipe.findUnique({
            where: { NE: parseInt(id) }
        });
        if (!equipe) {
            return res.status(404).send('Équipe non trouvée');
        }
        res.json(equipe);
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'équipe avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la récupération de l'équipe avec l'ID ${id}`);
    }
});

app.patch('/equipes/:id', async (req, res) => {
    const { id } = req.params;
    const { NOM } = req.body;
    try {
        const updatedEquipe = await prisma.equipe.update({
            where: { NE: parseInt(id) },
            data: { NOM }
        });
        res.json(updatedEquipe);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'équipe avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la mise à jour de l'équipe avec l'ID ${id}`);
    }
});

app.delete('/equipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.equipe.delete({
            where: { NE: parseInt(id) }
        });
        res.send('Équipe supprimée avec succès');
    } catch (error) {
        console.error(`Erreur lors de la suppression de l'équipe avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la suppression de l'équipe avec l'ID ${id}`);
    }
});


/***************************************
 * 
 * CRUD AFF
 * 
 * **************************************/

app.post('/affiliations', async (req, res) => {
    const { NP, NC, ANNEE } = req.body;
    try {
        const newAffiliation = await prisma.aff.create({
            data: { NP, NC: parseInt(NC), ANNEE: parseInt(ANNEE) }
        });
        res.status(201).json(newAffiliation);
    } catch (error) {
        console.error('Erreur lors de la création de l\'affiliation :', error);
        res.status(500).send('Erreur lors de la création de l\'affiliation');
    }
});

app.get('/affiliations', async (req, res) => {
    try {
        const affiliations = await prisma.aff.findMany();
        res.json(affiliations);
    } catch (error) {
        console.error('Erreur lors de la récupération des affiliations :', error);
        res.status(500).send('Erreur lors de la récupération des affiliations');
    }
});

app.get('/affiliations/:NP/:NC/:ANNEE', async (req, res) => {
    const { NP, NC, ANNEE } = req.params;
    console.log(req.params)
    try {
        const affiliation = await prisma.aff.findFirst({
            where: { NP, NC: parseInt(NC), ANNEE: parseInt(ANNEE) }
        });
        if (!affiliation) {
            return res.status(404).send('Affiliation non trouvée');
        }
        res.json(affiliation);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'affiliation :', error);
        res.status(500).send('Erreur lors de la récupération de l\'affiliation');
    }
});
//Définir une clé unique pour pouvoir supprimé une affiliation
app.delete('/affiliations/:NP/:NC/:ANNEE', async (req, res) => {
    const { NP, NC, ANNEE } = req.params;
    try {
        await prisma.aff.delete({
            where: { NP_NC_ANNEE: { NP, NC: parseInt(NC), ANNEE: parseInt(ANNEE) } }
        });
        res.send('Affiliation supprimée avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'affiliation :', error);
        res.status(500).send('Erreur lors de la suppression de l\'affiliation');
    }
});



/***************************************
 * 
 * CRUD PROJET
 * 
 * **************************************/

app.post('/projets', async (req, res) => {
    let { NP, NOM, BUDGET, NE } = req.body;
    NE = parseInt(NE)
    BUDGET = parseFloat(BUDGET)
    try {
        const newEquipe = await prisma.projet.create({
            data: { NP, NOM, BUDGET, NE }
        });
        res.status(201).json(newEquipe);
    } catch (error) {
        console.error('Erreur lors de la création de l\'équipe :', error);
        res.status(500).send('Erreur lors de la création de l\'équipe');
    }
});

app.get('/projets', async (req, res) => {
    try {
        const projets = await prisma.projet.findMany();
        res.json(projets);
    } catch (error) {
        console.error('Erreur lors de la récupération des équipes :', error);
        res.status(500).send('Erreur lors de la récupération des équipes');
    }
});

app.get('/projets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const projet = await prisma.projet.findUnique({
            where: { NP: id }
        });
        if (!projet) {
            return res.status(404).send('projet non trouvée');
        }
        res.json(projet);
    } catch (error) {
        console.error(`Erreur lors de la récupération de projet avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la récupération de projet avec l'ID ${id}`);
    }
});

app.patch('/projets/:id', async (req, res) => {
    const { id } = req.params;
    let { NOM, BUDGET } = req.body;
    BUDGET = parseFloat(BUDGET)
    try {
        const updatedProjet = await prisma.projet.update({
            where: { NP: id },
            data: { NOM, BUDGET }
        });
        res.json(updatedProjet);
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de projet avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la mise à jour de projet avec l'ID ${id}`);
    }
});

app.delete('/projets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.projet.delete({
            where: { NP: id }
        });
        res.send('projet supprimée avec succès');
    } catch (error) {
        console.error(`Erreur lors de la suppression de projet avec l'ID ${id} :`, error);
        res.status(500).send(`Erreur lors de la suppression de projet avec l'ID ${id}`);
    }
});

/***************************************
 * 
 * ENDPOINT EXERCICE
 * 
 * **************************************/

app.get('/budgets', async (req, res) => {
    try {
        const uniqueSortedBudgets = await prisma.projet.findMany({
            distinct: ['BUDGET'],
            orderBy: [{ BUDGET: 'desc' }]
        });
        res.json(uniqueSortedBudgets.map(project => project.BUDGET));
    } catch (error) {
        console.error('Erreur lors de la récupération des budgets :', error);
        res.status(500).send('Erreur lors de la récupération des budgets');
    }
});

app.get('/projets-budget', async (req, res) => {
    const { min, max } = req.query;

    if (!min || !max) {
        return res.status(400).send('Les valeurs min et max sont requises.');
    }

    try {
        const filteredProjects = await prisma.projet.findMany({
            where: {
                BUDGET: {
                    gte: parseFloat(min),
                    lte: parseFloat(max)
                }
            }
        });
        res.json(filteredProjects);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets par budget :', error);
        res.status(500).send('Erreur lors de la récupération des projets par budget');
    }
});

app.get('/chercheurs-avec-equipe', async (req, res) => {
    try {
        const chercheursWithEquipe = await prisma.chercheur.findMany({
            include: {
                equipe: true
            }
        });
        
        res.json(chercheursWithEquipe);
    } catch (error) {
        console.error('Erreur lors de la récupération des chercheurs avec leurs équipes :', error);
        res.status(500).send('Erreur lors de la récupération des chercheurs avec leurs équipes');
    }
});

app.get('/equipes-avec-projets', async (req, res) => {
    try {
        const teams = await prisma.equipe.findMany({
            include: {
                _count: {
                    select: {projet: true}
                }
            }
        })
        const equipesWithProject = teams.map(team => ({
            NOM: team.NOM,
            nombreDeProjets: team._count.projet,
          }));
        res.json(equipesWithProject);
    } catch (error) {
        console.error('Erreur lors de la récupération des équipes avec le nombre de projets :', error);
        res.status(500).send('Erreur lors de la récupération des équipes avec le nombre de projets');
    }
});

app.get('/chercheurs-participation', async (req, res) => {
    const { annee, budget } = req.query;
    
    if (!annee || !budget) {
        return res.status(400).send('Les paramètres "annee" et "budget" sont requis');
    }
    
    try {
        const chercheursParticipation = await prisma.chercheur.findMany({
            where: {
                aff: {
                    some: {
                        ANNEE: Number(annee),
                        projet: {
                            BUDGET: {
                                gt: parseFloat(budget),
                            }
                        }
                    }
                }
            },
            include: {
                aff: {
                    where: {
                        ANNEE: Number(annee),
                        projet: {
                            BUDGET: {
                                gt: parseFloat(budget),
                            }
                        }
                    },
                    include: {
                        projet: true
                    }
                }
            }
        });

        const filteredChercheurs = chercheursParticipation.filter(chercheur => {
            return chercheur.aff.length > 2;
        });

        const resChercheursParticipation = filteredChercheurs.map(chercheur => ({
            NOM: chercheur.NOM,
            PRENOM: chercheur.PRENOM,
        }));
        
        res.json(resChercheursParticipation);
    } catch (error) {
        console.error('Erreur lors de la récupération des chercheurs avec les critères spécifiés :', error);
        res.status(500).send('Erreur lors de la récupération des chercheurs avec les critères spécifiés');
    }
});

app.get('/chercheurs-participation-projet', async (req, res) => {
    const { nom, annee } = req.query;

    if (!nom || !annee) {
        return res.status(400).send('Les paramètres "nom" et "annee" sont requis');
    }

    try {
        // findUnique nécessite d'avoir le NC, l'énoncé demande que le nom et l'année
        const chercheurSpecifie = await prisma.chercheur.findFirst({
            where: { NOM: nom },
            include: {
                aff: {
                    where: { ANNEE: Number(annee) },
                    include: {
                        projet: {
                            select: {
                                NP: true,
                            },
                        },
                    },
                },
            },
        });

        if (!chercheurSpecifie) {
            return res.status(404).send(`Chercheur avec le nom "${nom}" non trouvé`);
        }

        const chercheursParticipationProjet = await prisma.chercheur.findMany({
            where: {
                aff: {
                    some: {
                        ANNEE: Number(annee),
                        projet: {
                            NP: chercheurSpecifie.aff[0]?.projet.NP,
                        },
                    },
                },
            },
        });

        res.json(chercheursParticipationProjet);
    } catch (error) {
        console.error(`Erreur lors de la récupération des chercheurs avec les critères spécifiés : ${error}`);
        res.status(500).send('Erreur lors de la récupération des chercheurs avec les critères spécifiés');
    }
});

app.get('/projets-budget-superieur', async (req, res) => {
    const { annee, budget } = req.query;

    if (!annee) {
        return res.status(400).send('Le paramètre "annee" est requis');
    }

    let budgetMinimum = 0;
    if (budget !== undefined && !isNaN(parseFloat(budget))) {
        budgetMinimum = parseFloat(budget);
    }

    try {
        // Récupérer les projets dont le budget est supérieur au budget minimum spécifié
        const projetsBudgetSuperieur = await prisma.projet.findMany({
            where: {
                aff: {
                    some: {
                        ANNEE: parseInt(annee)
                    }
                },
                BUDGET: {
                    gt: budgetMinimum
                }
            }
        });

        res.json(projetsBudgetSuperieur);
    } catch (error) {
        console.error(`Erreur lors de la récupération des projets avec un budget supérieur pour l'année ${annee} : ${error}`);
        res.status(500).send(`Erreur lors de la récupération des projets avec un budget supérieur pour l'année ${annee}`);
    }
});

app.get('/projets-par-chercheurs', async (req, res) => {
    const { nomA, nomB } = req.query;

    if (!nomA || !nomB) {
        return res.status(400).send('Les paramètres "nomA" et "nomB" sont requis');
    }

    try {
        // Récupérer les projets affectés aux chercheurs avec les noms spécifiés
        const projetsParChercheurs = await prisma.projet.findMany({
            where: {
                aff: {
                    some: {
                        chercheur: {
                            NOM: {
                                in: [nomA, nomB]
                            }
                        }
                    }
                }
            }
        });

        res.json(projetsParChercheurs);
    } catch (error) {
        console.error(`Erreur lors de la récupération des projets affectés aux chercheurs ${nomA} et ${nomB} : ${error}`);
        res.status(500).send(`Erreur lors de la récupération des projets affectés aux chercheurs ${nomA} et ${nomB}`);
    }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))