<template>
    <v-form ref="form" class="login-form">
        <h3 class="login-form-title pb-5">Login</h3>
        <span class="font-weight-bold">Email</span>
        <vimu-text-field v-model="email" :rules="emailRules"></vimu-text-field>
        <span class="font-weight-bold">Password</span>
        <vimu-text-field v-model="password" type="password"></vimu-text-field>
        <vimu-btn class="fill-width" :primary="true" :large="true" :loading="loading" :disabled="loading"
            @click="validateAndSubmit">Login</vimu-btn>
        <div class="py-5">
            <span>Don't have an account?</span>
            <a class="text-decoration-underline" @click="toggle">Sign up</a>
        </div>
        <div class="d-flex align-center">
            <v-divider></v-divider>
            <span class="px-4 vimu-text">or</span>
            <v-divider></v-divider>
        </div>
        <vimu-btn class="fill-width mt-6">Sign in with Google</vimu-btn>
    </v-form>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Ref } from "nuxt-property-decorator";
import { email } from "~/utils/verification_rules";
import VimuBtn from "../vimu/vimu_button.vue";
import VimuTextField from "../vimu/vimu_text_field.vue";

@Component({
    components: {
        VimuBtn,
        VimuTextField
    }
})
export default class LoginForm extends Vue {
    @Prop() readonly loading!: boolean;

    @Ref() readonly form!: HTMLFormElement;

    email: string = ""
    password: string = ""

    emailRules = [
        email
    ];

    validateAndSubmit() {
        if (this.form?.validate()) {
            
            this.submit();
        }
    }

    @Emit()
    toggle() {
        return;
    }

    @Emit()
    submit() {
        return { email: this.email, password: this.password }
    }
}
</script>

<style>
.login-form {
    position: relative;
    border: 3px solid currentColor;
    max-width: 500px;
    border-radius: 30px;
    padding: 32px;
    background-color: #fff;
    z-index: 0;
    margin: 0 auto
}

.login-form-title {
    font-size: 2.1rem;
    font-weight: 700;
}
</style>