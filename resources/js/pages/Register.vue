<template>
    <v-container style="height: 100%">
        <v-row align="center" justify="center" style="height: 100%">
            <v-card width="350" class="my-4" tile :loading="loading" :disabled="loading">
                <template slot="progress">
                    <v-progress-linear
                        color="grey darken-4"
                        indeterminate
                    ></v-progress-linear>
                </template>
                <v-alert
                    type="error"
                    v-if="errors.email"
                    tile
                >Акаунт з таким E-mail вже існує</v-alert>
                <v-card-title class="pb-0">
                    Реєстрація
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model.number="phone"
                        color="grey darken-4"
                        label="Телефон"
                        hide-details="auto"
                        type="number"
                        prefix="+380"
                        :error-messages="phoneErrors"
                        @input="$v.phone.$touch()"
                        @blur="$v.phone.$touch()"
                        autocomplete="off"
                    ></v-text-field>
                    <v-text-field
                        v-model.trim="pip"
                        color="grey darken-4"
                        label="ПІП"
                        hide-details="auto"
                        :error-messages="pipErrors"
                        @input="$v.pip.$touch()"
                        @blur="$v.pip.$touch()"
                        autocomplete="off"
                    ></v-text-field>
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
                    <v-text-field
                        v-model.trim="password_confirmation"
                        color="grey darken-4"
                        label="Повторення паролю"
                        hide-details="auto"
                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        :error-messages="passwordConfirmationErrors"
                        @input="$v.password_confirmation.$touch()"
                        @blur="$v.password_confirmation.$touch()"
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
                                @click="$router.push({ name: 'login', })"
                            >
                                <v-icon left>mdi-arrow-left-bold</v-icon>Вхід
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
                                Приєднатись
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
import { numeric, required, sameAs, email, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
    name: "Register",

    mixins: [validationMixin],
    validations: {
        phone: {
                required,
                numeric,
                minLength: minLength(9),
                maxLength: maxLength(9),
            },
        pip: {
                required,
            },
        email: {
                required,
                email,
            },
        password: {
                required,
                minLength: minLength(8),
            },
        password_confirmation: {
                required,
                sameAsPassword: sameAs('password'),
            },
    },

    data() {
        return {
            loading: false,

            show: false,

            phone: '',
            pip: '',
            email: '',
            password: '',
            password_confirmation: '',

            errors: {},
        };
    },

    computed: {
        phoneErrors() {
            const errors = [];
            if (!this.$v.phone.$dirty) return errors;
            !this.$v.phone.numeric && errors.push('Має бути дійсний телефон');
            !this.$v.phone.required && errors.push('Потрібен телефон');
            !this.$v.phone.minLength && errors.push('Має бути дійсний телефон');
            !this.$v.phone.maxLength && errors.push('Має бути дійсний телефон');
            return errors;
        },
        pipErrors() {
            const errors = [];
            if (!this.$v.pip.$dirty) return errors;
            !this.$v.pip.required && errors.push('Потрібно вказати ПІП');
            return errors;
        },
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
            !this.$v.password.minLength && errors.push('Пароль повинен бути більше 8 символів');
            !this.$v.password.required && errors.push('Потрібен пароль');
            return errors;
        },
        passwordConfirmationErrors() {
            const errors = [];
            if (!this.$v.password_confirmation.$dirty) return errors;
            !this.$v.password_confirmation.sameAsPassword && errors.push('Паролі повинні бути однаковими');
            !this.$v.password_confirmation.required && errors.push('Потрібно підтвердити пароль');
            return errors;
        },
    },

    methods: {
        submit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                let app = this;
                app.loading = true;
                this.$auth.register({
                    data: {
                        phone: app.phone,
                        pip: app.pip,
                        email: app.email,
                        password: app.password,
                        password_confirmation: app.password_confirmation,
                    },
                    success: function () {
                        app.loading = false;
                        this.$router.push({name: 'login', params: {successRegistrationRedirect: true}});
                    },
                    error: function (res) {
                        app.loading = false;
                        app.errors = res.response.data.errors || {};
                    }
                });
            }
        },
    },
}
</script>

<style scoped>
    .v-input >>> input[type=number]::-webkit-inner-spin-button,
    .v-input >>> input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none !important;
    }
</style>
