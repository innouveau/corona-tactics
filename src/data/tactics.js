const tactics = [
    {
        id: 1,
        title: "Niks doen",
        color: "#ff0000",
        periods: [
            {
                event_id: 1,
                start: "2020-02-27",
                end: "2020-08-31",
                comment: {
                    title: 'De eerste tactiek. Men laat het virus ongeremd rondgaan.<br>Het zorgsysteem ontploft. We nemen deze tactiek niet serieus.',
                    time: 6000
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
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'De maximale controle tactiek. Het virus gaat vrij rond tot half maart.',
                    time: 4000
                }
            }, {
                event_id: 2,
                start: "2020-03-23",
                end: "2020-05-10",
                comment: {
                    title: 'Nederland introduceert de Intelligente Lockdown<br>Deze werkt vrij goed! De lijn daalt',
                    time: 4000
                }
            }, {
                event_id: 3,
                start: "2020-05-11",
                end: "2020-05-31",
                comment: {
                    title: 'Het kabinet besluit de scholen te openen per begin juni',
                    time: 4000
                }
            }, {
                event_id: 5,
                start: "2020-06-01",
                end: "2020-08-31",
                comment: {
                    title: 'In juli volgt de horeca.',
                    time: 4000
                }
            }
        ]
    },
    {
        id: 3,
        title: "Containment",
        color: "#0be300",
        periods: [
            {
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'Nu de Containment tactiek.<br>Hetzelfde verloop: het virus gaat vrij rond tot half maart.',
                    time: 4000
                }
            }, {
                event_id: 2,
                start: "2020-03-23",
                end: "2020-06-15",
                comment: {
                    title: 'Weer de Intelligente lockdown. Alleen: we houden deze nog een paar weken langer aan!<br>De lijn blijft zakken.',
                    time: 5000
                }
            }, {
                event_id: 3,
                start: "2020-06-16",
                end: "2020-06-30",
                comment: {
                    title: 'En nu we veel lager zitten, kunnen we de scholen met veel minder risco openen.',
                    time: 2000
                }
            }, {
                event_id: 5,
                start: "2020-07-01",
                end: "2020-08-31",
                comment: {
                    title: 'En ook de horeca kan nu veel veiliger open. Want ondanks dat we net zo hard stijgen als bij Maximale Controle, blijft de lijn veel lager',
                    time: 3000
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
                event_id: 1,
                start: "2020-02-27",
                end: "2020-03-22",
                comment: {
                    title: 'Ten slotte nog de Uitroeingstactiek. Weer gaat het virus vrij rond tot half maart.',
                    time: 4000
                }
            }, {
                event_id: 4,
                start: "2020-03-23",
                end: "2020-08-31",
                comment: {
                    title: 'Daarna wordt hij keihard de kop ingedrukt.<br>Dit is helaas alleen slechts mogelijk met anti-democratische en anti-vrij middelen. Ook deze tactiek nemen we dus niet serieus.',
                    time: 4000
                }
            }
        ]
    }
];

export default tactics;