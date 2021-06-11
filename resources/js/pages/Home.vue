<template>
    <v-container>
        <v-row
            justify="center"
            align="center"
            class="pt-4"
        >
            <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                xl="2"
            >
                <v-card
                    flat
                    tile
                    link
                >
                    <v-img
                        src="/images/boys.jpg"
                        alt="Для хлопців"
                        max-height="450"
                        contain
                    >
                        <div
                            class="white--text px-4 py-2"
                            style="background-color: #272727; letter-spacing: .0892857143em; font-weight: 500; text-transform: uppercase; position:absolute; bottom: 20px; left: 20px"
                        >
                            Для хлопців
                        </div>
                    </v-img>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                xl="2"
            >
                <v-card
                    flat
                    tile
                    link
                >
                    <v-img
                        src="/images/girls.jpg"
                        alt="Для дівчат"
                        max-height="450"
                        contain
                    >
                        <div
                            class="white--text px-4 py-2"
                            style="background-color: #272727; letter-spacing: .0892857143em; font-weight: 500; text-transform: uppercase; position:absolute; bottom: 20px; left: 20px"
                        >
                            Для дівчат
                        </div>
                    </v-img>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                sm="4"
                md="4"
                lg="4"
                xl="2"
            >
                <v-card
                    flat
                    tile
                    link
                >
                    <v-img
                        src="/images/kids.jpg"
                        alt="Для дітей"
                        max-height="450"
                        contain
                    >
                        <div
                            class="white--text px-4 py-2"
                            style="background-color: #272727; letter-spacing: .0892857143em; font-weight: 500; text-transform: uppercase; position:absolute; bottom: 20px; left: 20px"
                        >
                            Для дітей
                        </div>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>

</style>
