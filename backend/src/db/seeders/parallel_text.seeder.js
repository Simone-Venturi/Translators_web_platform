const db = require("../models");

const ParallelText = db.parallel_text;

module.exports = {
    createParallelTexts : async () => {
        await ParallelText.create({
            originalText: "Pilar and Javier have been engaged for three years. They live in different cities but luckily Barcelona and Tarragona are not very far apart.",
            translatedText: "Pilar y Javier están comprometidos desde hace tres años. Viven en ciudades distintas, pero afortunadamente Barcelona y Tarragona no están muy lejos.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Pilar has the keys to Javier’s flat and Javier has the keys to Pilar’s apartment: they don’t have any secrets.",
            translatedText: "Pilar tiene la llave del piso de Javier, y Javier tiene la llave del apartamento de Pilar: no tienen ningún secreto.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Today is Wednesday and Pilar has no lessons at the university. She wants to surprise Javier because today is a very special day. For Pilar, in fact, it is a very important day.",
            translatedText: "Hoy es miércoles y Pilar no tiene clase en la universidad. Le quiere dar una sorpresa porque hoy es un día muy especial. Para Pilar, de hecho, es un día muy importante.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Today is May 15th. The anniversary of Pilar and Javier’s engagement.",
            translatedText: "Hoy es 15 de mayo. El aniversario de Javier y Pilar.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Pilar wants to give Javier a surprise: she is going to go to Javier’s place in Barcelona so they can celebrate this special day together.",
            translatedText: "Pilar le quiere dar una sorpresa: irá a casa de Javier a Barcelona para celebrar juntos este día tan especial.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "She knows Javier works until 5 o’clock, so she goes to the train station in Tarragona to catch the 4.18pm train. The train times are perfect!",
            translatedText: "Sabe que Javier trabaja hasta las 17:00h, así que va a la estación de tren de Tarragona para coger el tren de las 16:18h. ¡Los horarios son perfectos!",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "At the ticket office in the station she buys her ticket. It is one of the busiest train lines in Catalonia and the station is very crowded. Pilar’s train leaves from platform 4. Unfortunately the train leaves ten minutes late, but Pilar arrives in Barcelona at 5 o’clock. Just in time!",
            translatedText: "En la taquilla de la estación compra el billete. Es una de las líneas de tren más utilizadas de Cataluña y la estación está llena de gente. El tren de Pilar sale del andén número 4. Por desgracia, el tren sale con diez minutos de retraso, pero Pilar llega a Barcelona a las 17:00h. ¡Justo a tiempo!",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Pilar arrives at Javier’s house at 5.30. “Javier is sure to be home,” thinks Pilar. She rings the bell and waits, but no one opens the door.",
            translatedText: "Pilar llega a casa de Javier a las 17:30h. “Seguramente Javier estará en casa” piensa Pilar. Toca el timbre y espera, pero nadie abre la puerta.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "Javier is not at home.",
            translatedText: "Javier no está en casa.",
            originalLanguage: 130,
            translatedLanguage: 133
        });
        await ParallelText.create({
            originalText: "The Creator sat upon the throne, thinking. Behind him stretched the illimitable Continent of Heaven, steeped in a glory of light and color; before him rose the black night of Space, like a wall. His mighty bulk towered rugged and mountain-like into the zenith, and His divine head blazed there like a distant sun. At His feet stood three colossal figures, diminished to extinction, almost, by contrast - Archangels - their heads level with His ankle-bone. When the Creator had finished thinking, He said: \"I have thought. Behold!\" He lifted His hand, and from it burst a fountain-spray of fire, a million stupendous suns, which clove the blackness and soared, away and away and away, diminishing in magnitude and intensity as they pierced the far frontiers of Space, until at last they were but as diamond nailheads sparkling under the domed vast roof of the universe. At the end of an hour the Grand Council was dismissed. They left the Presence impressed and thoughtful, and retired to a private place, where they might talk with freedom. None of the three seemed to want to begin, though all wanted somebody to do it. Each was burning to discuss the Great Event, but would prefer not to commit himself till he should know how the others regarded it. So there was some aimless and halting conversation about matters of no consequence, and this dragged tediously along, arriving nowhere, until at last the archangel Satan gathered his courage together - of which he had a very good supply - and broke ground. He said: \"We know what we are here to talk about, my lords, and we may as well put pretense aside, and begin. If this is the opinion of the Council.\" \"It is, it is !\" said Gabriel and Michael, gratefully interrupting.",
            translatedText: "Il Creatore sedeva sul trono, pensando. Dietro di lui si stendeva l'illimitato Continente del Cielo, immerso in una gloria di luce e colore; davanti a lui saliva la nera notte dello Spazio, come un muro. La sua mole possente torreggiava aspra come una montagna nello zenith e la Sua testa divina sfolgorava in esso come un sole lontano. Ai suoi piedi c\'erano tre figure colossali, che quasi scomparivano, al confronto - arcangeli - le teste all\'altezza della Sua caviglia. Quando il Creatore ebbe finito di pensare, disse: \"ho pensato. Guardate!\" Levò la Sua mano e da essa sprizzò un getto di fuoco, un milione di soli stupendi, che solcarono le tenebre e salirono, sempre più lontano, diminuendo in magnitudine e intensità mentre fendevano le remote frontiere dello Spazio, finché alfine non furono nient\'altro che diamanti sfavillanti sotto la volta immensa dell\'universo. Al trascorrere di un\'ora il Gran Consiglio fu congedato. Essi lasciarono la Presenza impressionati e pensierosi e si ritirarono in un posto appartato dove poter parlare in libertà. Nessuno dei tre sembrava disposto a incominciare, sebbene tutti volessero che qualcuno lo facesse. Ciascuno bruciava dalla voglia di discutere il Grande Evento, ma preferiva non esporsi prima di sapere che ne pensassero gli altri. La conversazione si trascinò vaga e spezzettata intorno a questioni di nessuna importanza, finché l'arcangelo Satana non raccolse il suo coraggio - di cui aveva una scorta abbondante - e ruppe gli indugi. Disse: \"Sappiamo che cosa siamo qui a discutere, miei signori; possiamo pure smetterla con questa commedia e incominciare. Se questa è l'opinione del Consiglio\". \"Lo è, lo è !\" dissero Gabriele e Michele, interrompendo riconoscenti.",
            originalLanguage: 130,
            translatedLanguage: 215
        });
        await ParallelText.create({
            originalText: "Once upon a time there lived... \"A king!\" my little readers will say at once. No, my little ones, you are mistaken. Once upon a time there was a piece of wood. It wasn't an expensive wood, but a piece good for the stack, of those that in winter are placed in stoves and fireplaces to get a fire going and make cold rooms warm.",
            translatedText: "C'era una volta... \"Un re!\" diranno subito i miei piccoli lettori. No, ragazzi, avete sbagliato. C'era una volta un pezzo di legno. Non era un legno di lusso, ma un semplice pezzo da catasta, di quelli che d'inverno si mettono nelle stufe e nei caminetti per accendere il fuoco e per riscaldare le stanze.",
            originalLanguage: 130,
            translatedLanguage: 215
        });
        await ParallelText.create({
            originalText: "I know not how it was, but the fact is that one fine day this piece of wood ended up in the shop of an old carpenter, whose name was Mastro Antonio, except that everyone called him Maestro Ciliegia, Master Cherry, on account of the tip of his nose, which was always shiny and purple, like a ripe cherry. As soon as he had seen that piece of wood, Maestro Ciliegia was filled with joy; and, rubbing his hands together for the happiness, he mumbled in a half voice: \"This wood has come at precisely the right time; I shall use it to make the leg of a table.\"",
            translatedText: "Non so come andasse, ma il fatto gli è che un bel giorno questo pezzo di legno capitò nella bottega di un vecchio falegname, il quale aveva nome mastr'Antonio, se non che tutti lo chiamavano maestro Ciliegia, per via della punta del suo naso, che era sempre lustra e paonazza, come una ciliegia matura. Appena maestro Ciliegia ebbe visto quel pezzo di legno, si rallegrò tutto; e dandosi una fregatina di mani per la contentezza, borbottò a mezza voce: \"Questo legno è capitato a tempo; voglio servirmene per fare una gamba di tavolino\".",
            originalLanguage: 130,
            translatedLanguage: 215
        });
        await ParallelText.create({
            originalText: "No sooner said than done, he presently took the sharp hatchet to start shaving the bark off of it and rough-hew it; but as he was about to let go the first blow, he remained with his arm suspended in the air, for he heard a wee, little voice say in a beseeching tone: \"Don't hit me so hard!\" Imagine how that good old Maestro Ciliegia must have remained! He turned his bewildered eyes about the room to see where ever that little voice could have come from, and he saw no one! He looked under the bench, and no one; he looked into a closet that was always shut, and no one; he looked into the shavings and sawdust cask, and no one; he opened the door of the shop to throw an eye into the street, and no one! How then?...",
            translatedText: "Detto fatto, prese subito l'ascia arrotata per cominciare a levargli la scorza e a digrossarlo; ma quando fu lì per lasciare andare la prima asciata, rimase col braccio sospeso in aria, perché sentì una vocina sottile sottile, che disse raccomandandosi: \"Non mi picchiar tanto forte!\" Figuratevi come rimase quel buon vecchio di maestro Ciliegia! Girò gli occhi smarriti intorno alla stanza per vedere di dove mai poteva essere uscita quella vocina, e non vide nessuno! Guardò sotto il banco, e nessuno; guardò dentro un armadio che stava sempre chiuso, e nessuno; guardò nel corbello dei trucioli e della segatura, e nessuno; aprì l'uscio di bottega per dare un'occhiata anche sulla strada, e nessuno. O dunque?...",
            originalLanguage: 130,
            translatedLanguage: 215
        });
        console.log("Parallel Texts created")
    },
    createTestParallelTexts : async () => {  
        await ParallelText.create({
            originalText: "Dream as if you'll live forever. Live as if you'll die today.",
            translatedText: "Sogna come se dovessi vivere per sempre. Vivi come se dovessi morire oggi.",
            originalLanguage: 130,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "No existe la muerte. La gente solo muere cuando nos olvidamos de ellos.",
            translatedText: "La morte non esiste. Le persone muoiono solo quando ci dimentichiamo di loro.",
            originalLanguage: 133,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "No soy extraño. Sólo no soy normal.",
            translatedText: "Non sono strano. È solo che non sono normale.",
            originalLanguage: 133,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "Il mondo uno deve crearselo, deve crearsi i gradini che lo portino su, che lo portino fuori dal pozzo. Uno deve inventarsi la vita affinché possa diventare realtà.",
            translatedText: "El mundo hay que fabricárselo uno mismo, hay que crear peldaños que te suban, que te saquen del pozo. Hay que inventar la vida porque acaba siendo verdad.",
            originalLanguage: 215,
            translatedLanguage: 133
        });
    }
}