<template>
    <v-container>
        <v-row justify="center">
            <v-card class="mt-4" width="800" tile :disabled="loading">
                <v-card-title class="justify-center">
                    <div class="h1" style="font-weight: 300; text-transform: uppercase; letter-spacing: 6px;">Особистий кабінет</div>
                </v-card-title>
                <v-card-subtitle class="text-center">
                    <a @click.prevent="$auth.logout()">Вийти з аккаунту</a>
                </v-card-subtitle>
                <v-card-text class="pb-0 black--text" style="font-weight: 500; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px;">Особисті дані</v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                        >
                            <v-text-field
                                v-model.number="user.phone"
                                color="grey darken-4"
                                label="Телефон"
                                hide-details="auto"
                                type="number"
                                prefix="+380"
                                :error-messages="phoneErrors"
                                @input="$v.user.phone.$touch()"
                                @blur="$v.user.phone.$touch()"
                                autocomplete="off"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                        >
                            <v-text-field
                                v-model.trim="user.pip"
                                color="grey darken-4"
                                label="ПІП"
                                hide-details="auto"
                                :error-messages="pipErrors"
                                @input="$v.user.pip.$touch()"
                                @blur="$v.user.pip.$touch()"
                                autocomplete="off"
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="4"
                            md="4"
                            lg="4"
                            xl="4"
                        >
                            <v-text-field
                                v-model="user.email"
                                color="grey darken-4"
                                label="Email"
                                hide-details="auto"
                                :error-messages="emailErrors"
                                @input="$v.user.email.$touch()"
                                @blur="$v.user.email.$touch()"
                                autocomplete="off"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn
                    :loading="loading"
                    dark
                    block
                    tile
                    elevation="0"
                    @click="update"
                >
                    Редагувати
                </v-btn>
            </v-card>
        </v-row>
    </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { numeric, required, email, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
    name: "Account",

    mixins: [validationMixin],
    validations: {
        user: {
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
        },
    },

    data() {
        return {
            loading: false,

            user: {
                phone: '',
                pip: '',
                email: '',
            },
        };
    },

    created() {
        this.user.phone = this.$auth.user().phone;
        this.user.pip = this.$auth.user().pip;
        this.user.email = this.$auth.user().email;
    },

    computed: {
        phoneErrors() {
            const errors = [];
            if (!this.$v.user.phone.$dirty) return errors;
            !this.$v.user.phone.numeric && errors.push('Має бути дійсний телефон');
            !this.$v.user.phone.required && errors.push('Потрібен телефон');
            !this.$v.user.phone.minLength && errors.push('Має бути дійсний телефон');
            !this.$v.user.phone.maxLength && errors.push('Має бути дійсний телефон');
            return errors;
        },
        pipErrors() {
            const errors = [];
            if (!this.$v.user.pip.$dirty) return errors;
            !this.$v.user.pip.required && errors.push('Потрібно вказати ПІП');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.user.email.$dirty) return errors;
            !this.$v.user.email.email && errors.push('Має бути дійсний електронний лист');
            !this.$v.user.email.required && errors.push('Потрібна електронна пошта');
            return errors;
        },
    },

    methods: {
        async update() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.loading = true;
                try {
                    const { data } = await axios.post('account/update', this.user);
                    this.$auth.user(data.user);
                    this.loading = false;
                } catch (err) {
                    this.loading = false;
                }
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
