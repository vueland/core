---
layout: home
title: Core UI
---

<script>import {useRouter} from 'vitepress'
    import {CBtn, CCard, CCardBody, CCardFooter} from "@vueland/ui/components"
    export default {
        components: {
            CBtn,
            CCard,
            CCardBody,
            CCardFooter
        },
        setup() {
            const router = useRouter();
            return { router }
        },
    }
</script>

<div style="height: calc(100vh - 200px)" class="d-flex justify-center items-center">
    <c-card style="--card-width: 600px;" class="bg-grey-darken-4">
        <c-card-body class="d-flex justify-center items-center" style="height: 300px; object-fit: cover">
            <img src="./.vitepress/static/core-ui-white.png" alt="" style="max-width: 150%">
        </c-card-body>
        <c-card-footer class="d-flex justify-center items-center pb-5">
            <c-btn @click="router.go('/guide/getting-started')" width="180" variant="outlined" style="color: var(--vp-c-brand-1)">Поехали</c-btn>
        </c-card-footer>
    </c-card>
</div>
