const tactics = [
    {
        id: 1,
        title: "Niks doen",
        color: "#ff0000",
        periods: [
            {
                id: 1,
                event_id: 1,
                start: "2020-02-27",
                end: "2020-08-31",
                comment: {
                    title: 'De eerste tactiek. Men laat het virus ongeremd rondgaan.<br>Het zorgsysteem ontploft. We nemen deze tactiek niet serieus (niemand).',
                    time: 4000
                }
            }
        ]
    }
    , {
        id: 2,
        title: "'Maximale Controle'",
        color: "#0088ff",
        periods: [
            {
                id: 2,
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'Dan de Maximale Controle tactiek.<Br>Het virus gaat vrij rond tot half maart (echte cijfers).',
                    time: 3000
                }
            }, {
                id: 3,
                event_id: 2,
                start: "2020-03-23",
                end: "2020-05-10",
                comment: {
                    title: 'Nederland introduceert de Intelligente Lockdown<br>Deze werkt vrij goed! De lijn daalt (ook echte cijfers).',
                    time: 4000
                }
            }, {
                id: 4,
                event_id: 3,
                start: "2020-05-11",
                end: "2020-05-31",
                comment: {
                    title: 'Het kabinet besluit de scholen te openen per half mei.<br>Dit zorgt voor een kleine groei (prognose obv instelbaar groeicijfer)',
                    time: 6000
                }
            }, {
                id: 5,
                event_id: 5,
                start: "2020-06-01",
                end: "2020-08-31",
                comment: {
                    title: 'In juni volgt de horeca.<br>De groei gaat iets harder.',
                    time: 4000
                }
            }
        ]
    },
    {
        id: 3,
        title: "Crush the Curve",
        color: "#0be300",
        periods: [
            {
                id: 6,
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'Nu de Crush the Curve tactiek.<br>Hetzelfde verloop: het virus gaat vrij rond tot half maart.',
                    time: 4000
                }
            }, {
                id: 7,
                event_id: 2,
                start: "2020-03-23",
                end: "2020-05-31",
                comment: {
                    title: 'Weer de Intelligente lockdown.<br>Alleen: we houden deze nog een paar weken langer aan! De lijn blijft zakken.',
                    time: 5000
                }
            }, {
                id: 8,
                event_id: 3,
                start: "2020-06-01",
                end: "2020-06-30",
                comment: {
                    title: 'En nu we veel lager zitten, kunnen we de scholen met veel minder risco openen.<br>Let op: de groei is hetzelfde als bij de vorige tactiek.',
                    time: 6000
                }
            }, {
                id: 9,
                event_id: 5,
                start: "2020-07-01",
                end: "2020-08-31",
                comment: {
                    title: 'En ook de horeca kan nu veel veiliger open.<br>Want ondanks dat we net zo hard stijgen als bij Maximale Controle, blijft de lijn veel lager.',
                    time: 7000
                }
            }
        ]
    }
    , {
        id: 4,
        title: "Uitroeing",
        color: "purple",
        periods: [
            {
                id: 10,
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'Tenslotte nog de Uitroei-tactiek. Weer gaat het virus vrij rond tot half maart.',
                    time: 4000
                }
            }, {
                id: 11,
                event_id: 4,
                start: "2020-03-23",
                end: "2020-08-31",
                comment: {
                    title: 'Daarna wordt hij keihard de kop ingedrukt.<br>Dit is helaas alleen slechts mogelijk met anti-democratische en anti-vrijheids middelen. Ook deze tactiek nemen we dus niet serieus.',
                    time: 7000
                }
            }
        ]
    }
];

export default tactics;