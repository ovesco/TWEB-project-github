import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faEnvelope,
    faBriefcase, faBuilding, faExternalLinkAlt,
    faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faMapMarkerAlt, faEnvelope,
    faBriefcase, faBuilding, faExternalLinkAlt,
    faTachometerAlt);

Vue.component('fa-icon', FontAwesomeIcon);
