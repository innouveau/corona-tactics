<script>
    export default {
        name: 'disclaimer',
        components: {},
        props: {},
        computed: {},
        methods: {
            close() {
                this.$store.commit('ui/updateProperty', {key: 'disclaimer', value: false});
            }
        }
    }
</script>


<template>
    <div class="disclaimer">
        <h3>
            Disclaimer
        </h3>

        <p>
        Deze 'animatie-infographic-tool' is gemaakt door Jeroen Breen (geen viroloog of wiskundige, etc).
        </p>
        <p>
            Het doel is om het effect van het verschil tussen 'Maximale Controle' (tactiek van het kabinet)
            en 'Crush the Curve' uit te leggen.
        </p>
        <p>
            Het is goed om op te merken dat de variabelen binnen deze 2 tactieken hetzelfde zijn (je kunt
            met die variabelen spelen). Geillustreerd wordt, hoe sterk het effect is van puur alleen nog
            een paar weken langer de lockdown aanhouden: wat voor effect dit heeft op de gezondheidszorg en op de mogelijkheden binnen de economie.
        </p>
        <p>
            De cijfers achter de grafiek van 27 februari (1e case in Nederland) tot begin mei (moment van maken van deze tool)
            zijn echte getallen (van gedetecteerde besmettingen). <br>
            De lijn daarna is een prognose obv de
            instelbare variabelen. Nogmaals: deze variabelen zijn voor 'Maximale Controle'
            en 'Crush the Curve' hetzelfde/gekoppeld. Enig verschil is de datum.
        </p>
        <p>
            Op de assen staan geen exacte cijfers, om te benadrukken dat dit een illustratie
            en een visualisatie is van een trend. De piek van half april kunt u beschouwen
            als de capaciteit van ons zorgsysteem.
        </p>
        <p>
            De repo is hier te zien: <a href="https://github.com/innouveau/corona-tactics" target="_blank">https://github.com/innouveau/corona-tactics</a>
        </p>
        <div class="disclaimer__close">
            <div
                    @click="close()"
                    class="button">
                Sluit
            </div>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .disclaimer {
        border: 1px solid #ddd;
        padding: 32px;
        background: #fff;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 700px;
        box-shadow: 2px 2px 12px rgba(0,0,0, 0.2);
        font-size: 14px;
        max-width: 100%;

        .disclaimer__close {
            position: absolute;
            right: 10px;
            top: 10px;
        }
    }
</style>