<template>
    <v-app app>
        <v-toolbar
            dark
            flat
        >
            <v-toolbar-title>
                <a  @click="$router.push({ name: 'home', })">
                    Clothing Store
                </a>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="authorization">
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
        </v-toolbar>

        <v-main>
            <router-view></router-view>
        </v-main>

        <v-footer
            dark
            padless
        >
            <v-card
                flat
                tile
                class="mx-auto"
            >
                <v-card-text class="text-center">
                    <v-btn
                        icon
                    >
                        <v-icon>
                            mdi-facebook
                        </v-icon>
                    </v-btn>
                    <v-btn
                        icon
                    >
                        <v-icon>
                            mdi-twitter
                        </v-icon>
                    </v-btn>
                    <v-btn
                        icon
                    >
                        <v-icon>
                            mdi-instagram
                        </v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Clothing Store</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: "Index",

    methods: {
        authorization() {
            if (this.$auth.check()) {
                this.$router.push({ name: 'account', });
            } else {
                this.$router.push({ name: 'login', });
            }
        },
    },
}
</script>

<style scoped>
    a {  text-decoration: none; }
    .v-toolbar {
        flex: none !important;
    }
    .v-footer {
        background-color: #1e1e1e !important;
    }
</style>
