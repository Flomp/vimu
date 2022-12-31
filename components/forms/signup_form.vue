<template>
    <v-form ref="form" class="login-form">
        <h3 class="login-form-title pb-5">Sign up</h3>
        <span class="font-weight-bold">Email</span>
        <vimu-text-field v-model="email" :rules="emailRules"></vimu-text-field>
        <span class="font-weight-bold">Password</span>
        <vimu-text-field v-model="password" type="password" :rules="passwordRules"></vimu-text-field>
        <span class="font-weight-bold">Repeat password</span>
        <vimu-text-field v-model="passwordConfirm" type="password" :rules="passwordConfirmRules"></vimu-text-field>
        <vimu-btn class="fill-width" :primary="true" :large="true" :loading="loading" :disabled="loading"
            @click="validateAndSubmit">Sign up</vimu-btn>
        <div class="py-5">
            <span>Already have an account? </span>
            <a class="text-decoration-underline" @click="toggle">Login</a>
        </div>
        <div class="d-flex align-center">
            <v-divider></v-divider>
            <span class="px-4 vimu-text">or</span>
            <v-divider></v-divider>
        </div>
        <google-btn class="fill-width mt-6" @click="oauth">Sign in with
            Google</google-btn>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Emit, Ref, Prop } from "nuxt-property-decorator";
import { email, password, required } from "~/utils/verification_rules";
import VimuBtn from "../vimu/vimu_button.vue";
import VimuTextField from "../vimu/vimu_text_field.vue";
import GoogleBtn from "./google_btn.vue";

@Component({
    components: {
        VimuBtn,
        VimuTextField,
        GoogleBtn
    }
})
export default class SignUpForm extends Vue {
    @Prop() readonly loading!: boolean;

    @Ref() readonly form!: HTMLFormElement;

    email: string = ""
    password: string = ""
    passwordConfirm: string = "";

    emailRules = [
        required,
        email
    ];

    passwordRules = [
        required,
        password,
    ]

    passwordConfirmRules = [
        required,
        this.passwordsMatch
    ]

    passwordsMatch(v: string) {
        return v == this.password || "Passwords don't match";
    }

    @Emit()
    toggle() {
        return;
    }

    validateAndSubmit() {
        if (this.form?.validate()) {
            this.submit();
        }
    }

    @Emit()
    submit() {
        return { email: this.email, password: this.password, passwordConfirm: this.passwordConfirm }
    }

    @Emit()
    oauth() {
        return;
    }
}
</script>

<style>

</style>