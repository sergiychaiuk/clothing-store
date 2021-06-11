<template>
    <v-container style="height: 100%">
        <v-row align="center" justify="center" style="height: 100%">
            <v-card width="350" tile :loading="loading" :disabled="loading">
                <template slot="progress">
                    <v-progress-linear
                        color="grey darken-4"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <v-alert
                    type="error"
                    v-if="error"
                    tile
                >Неправильні логін або пароль</v-alert>
                <v-card-title class="pb-0">
                    Вхід
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="email"
                        color="grey darken-4"
                        label="Email"
                        hide-details="auto"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        autocomplete="off"
                    ></v-text-field>
                    <v-text-field
                        v-model.trim="password"
                        color="grey darken-4"
                        label="Пароль"
                        hide-details="auto"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        :error-messages="passwordErrors"
                        @input="$v.password.$touch()"
                        @blur="$v.password.$touch()"
                        autocomplete="off"
                    ></v-text-field>
                </v-card-text>
                <v-container class="pt-6">
                    <v-row>
                        <v-col cols="6" class="pa-0">
                            <v-btn
                                block
                                tile
                                elevation="0"
                                @click="$router.push({ name: 'register', })"
                            >
                                <v-icon left>mdi-arrow-left-bold</v-icon>Реєстрація
                            </v-btn>
                        </v-col>
                        <v-col cols="6" class="pa-0">
                            <v-btn
                                :loading="loading"
                                dark
                                block
                                tile
                                elevation="0"
                                @click="submit"
                            >
                                Увійти
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
    name: "Login",

    mixins: [validationMixin],
    validations: {
        email: {
                required,
                email,
            },
        password: {
                required,
            },
    },

    data() {
        return {
            loading: false,

            show: false,

            email: '',
            password: '',

            error: '',
        };
    },

    computed: {
        emailErrors() {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push('Має бути дійсний електронний лист');
            !this.$v.email.required && errors.push('Потрібна електронна пошта');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('Потрібен пароль');
            return errors;
        },
    },

    methods: {
        submit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let app = this;
                app.loading = true;
                this.$auth.login({
                    data: {
                        email: app.email,
                        password: app.password,
                    },
                    success: function () {
                        app.loading = false;
                        const redirectTo = this.$auth.user().role === 2 ? 'home' : 'account';
                        this.$router.push({name: redirectTo});
                    },
                    error: function (res) {
                        app.loading = false;
                        app.error = res.response.data.error;
                    },
                    rememberMe: true,
                    fetchUser: true
                });
            }
        },
    },
}
</script>

<style scoped>

</style>
