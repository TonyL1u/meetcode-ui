<template>
    <div class="orbit-container mc-flex mc-space-x-12">
        <div class="orbit">
            <div class="point"></div>
        </div>
        <div class="orbit">
            <div class="absolute mc-left-0 mc-top-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 0.1s"></div>
            <div class="absolute mc-left-0 mc-bottom-0 w-half h-half border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 0s"></div>
            <div class="absolute mc-right-0 mc-bottom-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 0.2s"></div>
            <div class="absolute mc-top-0 mc-right-0 w-half h-half bg-blue-transparent rounded-full wave" style="--wave-delay: 0.4s"></div>
            <div class="absolute mc-left-0 w-half h-half bg-white-transparent-2 rounded-full wave" style="--wave-delay: 0.5s"></div>
            <div class="absolute w-full h-0 border border-dashed border-white-transparent-1"></div>
            <div class="absolute w-0 h-full border border-dashed border-white-transparent-1"></div>
            <div class="absolute border border-solid border-white w-half h-half rounded-full"></div>
            <div class="absolute border border-solid border-white w-quart h-quart rounded-full"></div>
            <div class="point" style="--point-color: var(--brown-color-transparent); --point-width: 1rem"></div>
            <div class="point" style="--point-color: var(--brown-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -2)"></div>
        </div>
        <div class="orbit">
            <div class="absolute mc-left-0 mc-top-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 1.1s"></div>
            <div class="absolute mc-left-0 mc-bottom-0 w-half h-half border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 1s"></div>
            <div class="absolute mc-right-0 mc-bottom-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 1.2s"></div>
            <div class="absolute mc-top-0 mc-right-0 w-half h-half bg-blue-transparent rounded-full wave" style="--wave-delay: 1.4s"></div>
            <div class="absolute mc-left-0 w-half h-half bg-white-transparent-2 rounded-full wave" style="--wave-delay: 1.5s"></div>
            <div class="absolute w-full h-0 border border-dashed border-white-transparent-1"></div>
            <div class="absolute w-0 h-full border border-dashed border-white-transparent-1"></div>
            <div class="absolute border border-solid border-white w-half h-half rounded-full"></div>
            <div class="absolute border border-solid border-white w-quart h-quart rounded-full"></div>
            <div class="point" style="--point-color: var(--red-color-transparent); --point-width: 1rem"></div>
            <div class="point" style="--point-color: var(--red-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -2); --spin-duration: 2s"></div>
            <div class="point" style="--point-color: var(--red-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -4); --spin-duration: 2s"></div>
        </div>
        <div class="orbit">
            <div class="absolute mc-left-0 mc-top-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 2.1s"></div>
            <div class="absolute mc-left-0 mc-bottom-0 w-half h-half border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 2s"></div>
            <div class="absolute mc-right-0 mc-bottom-0 w-quart h-quart border border-solid border-white-transparent-2 rounded-full wave" style="--wave-delay: 2.2s"></div>
            <div class="absolute mc-top-0 mc-right-0 w-half h-half bg-blue-transparent rounded-full wave" style="--wave-delay: 2.4s"></div>
            <div class="absolute mc-left-0 w-half h-half bg-white-transparent-2 rounded-full wave" style="--wave-delay: 2.5s"></div>
            <div class="absolute w-full h-0 border border-dashed border-white-transparent-1"></div>
            <div class="absolute w-0 h-full border border-dashed border-white-transparent-1"></div>
            <div class="absolute border border-solid border-white w-half h-half rounded-full"></div>
            <div class="absolute border border-solid border-white w-quart h-quart rounded-full"></div>
            <div class="point" style="--point-color: var(--yellow-color-transparent); --point-width: 1rem"></div>
            <div class="point" style="--point-color: var(--yellow-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -2); --spin-duration: 2s"></div>
            <div class="point" style="--point-color: var(--yellow-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -4); --spin-duration: 2s"></div>
            <div class="point" style="--point-color: var(--yellow-color-transparent); --point-width: 1rem; --spin-delay: calc(var(--spin-duration) / -4); --spin-duration: 1s"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dark .orbit-container {
    --white-color-transparent-1: rgba(255, 255, 255, 0.5);
    --white-color-transparent-2: rgba(255, 255, 255, 0.35);
    --brown-color-transparent: rgba(162, 118, 63, 0.5);
    --blue-color-transparent: rgba(66, 91, 100, 0.95);
    --red-color-transparent: rgba(150, 61, 65, 0.95);
    --yellow-color-transparent: rgba(149, 144, 65, 0.95);
    --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
}

.orbit-container {
    --white-color-transparent-1: rgba(0, 0, 0, 0.5);
    --white-color-transparent-2: rgba(0, 0, 0, 0.35);
    --brown-color-transparent: rgba(162, 118, 63, 0.5);
    --blue-color-transparent: rgba(66, 91, 100, 0.95);
    --red-color-transparent: rgba(150, 61, 65, 0.95);
    --yellow-color-transparent: rgba(149, 144, 65, 0.95);
    --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
}

.w-half {
    width: 50%;
}

.h-half {
    height: 50%;
}

.w-quart {
    width: 25%;
}

.h-quart {
    height: 25%;
}

.border-solid {
    border-style: solid;
}

.border {
    border-width: 1px;
}

.border-white {
    border-color: rgba(0, 0, 0, 0.5);
}

.dark .border-white {
    border-color: rgba(255, 255, 255, 0.5);
}

.rounded-full {
    border-radius: 50%;
}

.absolute {
    position: absolute;
}

.bg-blue-transparent {
    background: var(--blue-color-transparent);
}

.bg-red-transparent {
    background: var(--red-color-transparent);
}

.bg-yellow-transparent {
    background: var(--yellow-color-transparent);
}

.bg-white-transparent-2 {
    background: var(--white-color-transparent-2);
}

.border-white-transparent-1 {
    border-color: var(--white-color-transparent-1);
}

.border-white-transparent-2 {
    border-color: var(--white-color-transparent-2);
}

.dark .orbit {
    --point-color: white;
}

.orbit {
    --orbit-width: 6rem;
    --orbit-border-width: 1px;
    --orbit-radius: calc(calc(var(--orbit-width) + var(--orbit-border-width)) / 2);
    --point-width: 1.5rem;
    --orbit-color: var(--white-color-transparent-1);
    --point-color: black;
    --spin-duration: 4s;
    --spin-delay: 0s;

    position: relative;
    width: var(--orbit-width);
    height: var(--orbit-width);
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--orbit-border-width) solid var(--orbit-color);
    border-radius: 50%;

    .point {
        position: absolute;
        width: var(--point-width);
        height: var(--point-width);
        animation: spin var(--spin-duration) var(--spin-delay) linear infinite;

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--point-color);
            border-radius: 50%;
            transform: translateX(var(--orbit-radius));
        }
    }
}

.wave {
    transform: scale(0);
    animation: wave 3s var(--wave-delay, 0s) var(--ease-out-cubic) forwards infinite;
}

@keyframes spin {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(1turn);
    }
}

@keyframes wave {
    0% {
        transform: scale(0);
    }

    10%,
    65% {
        transform: scale(1.5);
    }

    80%,
    100% {
        opacity: 0;
        transform: scale(1.5);
    }
}
</style>
