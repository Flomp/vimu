<template>
    <v-form ref="form" class="login-form">
        <h3 class="login-form-title pb-5">Sign up</h3>
        <span class="font-weight-bold">Email</span>
        <vimu-text-field v-model="email" :rules="emailRules"></vimu-text-field>
        <span class="font-weight-bold">Password</span>
        <vimu-text-field v-model="password" type="password" :rules="passwordRules"></vimu-text-field>
        <span class="font-weight-bold">Repeat password</span>
        <vimu-text-field v-model="passwordConfirm" type="password" :rules="passwordConfirmRules"></vimu-text-field>
        <vimu-btn class="fill-width" :primary="true" :large="true" :loading="loading" :disabled="loading" @click="validateAndSubmit">Sign up</vimu-btn>
        <v-divider class="my-6"></v-divider>
        <span>Already have an account? <a class="accent--text" @click="toggle">Login</a> </span>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Emit, Ref, Prop } from "nuxt-property-decorator";
import { email, password, required } from "~/utils/verification_rules";
import VimuBtn from "../vimu/vimu_button.vue";
import VimuTextField from "../vimu/vimu_text_field.vue";

@Component({
    components: {
        VimuBtn,
        VimuTextField
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
}
</script>

<style>

</style>