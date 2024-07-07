/**
 * table icon import
 */
import studyIconTable from './assets/icons/Table/study.svg';
import caseIconTable from './assets/icons/Table/case.svg';
import clinicalTrialIconTable from './assets/icons/Table/clinical_trial.svg';
import adminIconTable from './assets/icons/Table/administrative.svg';
import biospecimenIconTable from './assets/icons/Table/biospecimen.svg';
import analysisIconTable from './assets/icons/Table/analysis.svg';
import dataFileIconTable from './assets/icons/Table/data_file.svg';
import clinicalIconTable from './assets/icons/Table/clinical.svg';


/**
 * legend icon import
 */
import studyIconLegend from './assets/icons/Legend/lg_study.svg';
import caseIconLegend from './assets/icons/Legend/lg_case.svg';
import clinicalTrialIconLegend from './assets/icons/Legend/lg_clinical_trial.svg';
import adminIconLegend from './assets/icons/Legend/lg_administrative.svg';
import biospecimenIconLegend from './assets/icons/Legend/lg_biospecimen.svg';
import analysisIconLegend from './assets/icons/Legend/lg_analysis.svg';
import dataFileIconLegend from './assets/icons/Legend/lg_data_file.svg';
import clinicalIconLegend from './assets/icons/Legend/lg_clinical.svg';

/***
 * graph icon import
 */

import studyIconGraph from "./assets/icons/Graph/study.svg";
import caseIconGraph from "./assets/icons/Graph/case.svg";
import clinicalTrialIconGraph from "./assets/icons/Graph/clinical_trial.svg";
import adminIconGraph from "./assets/icons/Graph/administrative.svg";
import biospecimenIconGraph from "./assets/icons/Graph/biospecimen.svg";
import analysisIconGraph from "./assets/icons/Graph/analysis.svg";
import dataFileIconGraph from "./assets/icons/Graph/data_file.svg";
import clinicalIconGraph from "./assets/icons/Graph/clinical.svg";


import IconDefault from './assets/icons/icon_default.svg';

export const pageTitle = 'Data Model Navigator';
export const brandIconSrc = 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/4a3fb8e201e6ba2a858d7ec1226d2fd6ea2b5298/icdc/images/svgs/Icon-DMNav.85x85.svg';

export const mdfParseHooks = [
  // add inclusion and uiDisplay tags to properties:
  function () {
    const translate = { "Yes":"required", "No":"optional", "Preferred":"preferred" };
    this.props().
      forEach( (prop) => {
        let val = translate[prop.is_required] || "optional";
        this.updateTags("Inclusion", val, prop);
        val = prop.tags().filter( (t) => t[0] == 'Labeled' ).length > 0 ? "yes" : "no";
        this.updateTags("UI Display", val, prop);
      });
    return this;
  },
];

export const facetSections = [ //facetSectionProps
  {
    section: 'Filter By Nodes',
    color: '#0D71A3',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#0d71a3',
    checkBoxBorderColor: '#0D71A3',
    height: '7px',
    isExpanded: true,
  },
  {
    section: 'Filter By Relationship',
    color: '#FF9742',
    checkBoxColorsOne: '#FF9742',
    checkBoxColorsTwo: '#FF9742',
    height: '7px',
    isExpanded: true,
  },
  {
    section: 'Filter By Property',
    color: '#94C0EC',
    checkBoxColorsOne: '#E3F4FD',
    checkBoxColorsTwo: '#0d71a3',
    checkBoxBorderColor: '#0D71A3',
    height: '7px',
    isExpanded: true,
  },
];

export const facetFilters = [
  {
    tag: 'Category',
    groupName: 'Category',
    datafield: 'category',
    section: 'Filter By Nodes',
    tooltip: 'category',
    type: {entity: 'node', tag: 'Category'},
    show: true,
    checkboxItems: [
      { name: 'Administrative', tag: 'Category', value: 'administrative', isChecked: false, group: 'category' },
      { name: 'Analysis', tag: 'Category', value: 'analysis', isChecked: false, group: 'category' },
      { name: 'Biospecimen', tag: 'Category', value: 'biospecimen', isChecked: false, group: 'category' },
      { name: 'Case', tag: 'Category', value: 'case', isChecked: false, group: 'category' },
      { name: 'Clinical', tag: 'Category', value: 'clinical', isChecked: false, group: 'category' },
      { name: 'Clinical_Trial', tag: 'Category', value: 'clinical_trial', isChecked: false, group: 'category' },
      { name: 'Data_File', tag: 'Category', value: 'data_file', isChecked: false, group: 'category' },
      { name: 'Study', tag: 'Category', value: 'study', isChecked: false, group: 'category' },
    ],
  },
  {
    tag: 'Assignment',
    groupName: 'Assignment',
    datafield: 'assignment',
    section: 'Filter By Nodes',
    tooltip: 'assignment',
    type: {entity: 'node', tag: 'Assignment'},
    show: true,
    checkboxItems: [
      { name: 'Core', tag: 'Assignment', value: 'core', isChecked: false, group: 'assignment' },
      { name: 'Extended', tag: 'Assignment', value: 'extended', isChecked: false, group: 'assignment' },
    ],
  },
  {
    tag: 'Class',
    groupName: 'Class',
    datafield: 'class',
    section: 'Filter By Nodes',
    tooltip: 'class',
    type: { entity: 'node', tag: 'Class' },
    show: true,
    checkboxItems: [
      { name: 'Primary', tag: 'Class', value: 'primary', isChecked: false, group: 'class' },
      { name: 'Secondary', tag: 'Class', value: 'secondary', isChecked: false, group: 'class' },
    ],
  },
  {
    tag: 'Inclusion',
    groupName: 'Inclusion',
    datafield: 'inclusion',
    section: 'Filter By Property',
    tooltip: 'inclusion',
    type: {entity: 'prop', tag: 'Inclusion'},
    show: true,
    checkboxItems: [
      { name: 'Optional', tag: 'Inclusion', value: 'optional', isChecked: false, group: 'optional' },
      { name: 'Preferred', tag: 'Inclusion', value: 'preferred', isChecked: false, group: 'preferred' },
      { name: 'Required', tag: 'Inclusion', value: 'required', isChecked: false, group: 'required' },
    ],
  },
  {
    tag: 'UI Display',
    groupName: 'UI Display',
    datafield: 'uiDisplay',
    section: 'Filter By Property',
    tooltip: 'inclusion',
    type: {entity: 'prop', tag: 'UI Display' },
    show: true,
    checkboxItems: [
      { name: 'no', tag: 'UI Display', value: 'no', isChecked: false, group: 'no' },
      { name: 'yes', tag: 'UI Display', value: 'yes', isChecked: false, group: 'yes' },
    ],
  },
];

export const legendTag = 'Category';

export const annotationTags = ['Assignment', 'Class'];

export const tagAttributes = [ // nodeCategoriesList, graphNodeCategoryList, tableNodeCategoryList, legendNodeCategoryList
  {
    tag: 'Category',
    value: 'administrative',
    node: {
      color: '#9C2E1F',
      background: '#691706',
    },
    graph: {
      icon: adminIconGraph,
      color: '#9B2C1F',
    },
    legend: {
      icon: adminIconLegend,
      color: '#9B2C1F',
    },
    table: {
      color: '#9B2C1F',
      icon: adminIconTable,
    },
  },
  {
    tag: 'Category',
    value: 'study',
    node: {
      color: '#9775FF',
      background: '#4D31A2',
    },
    graph: {
      icon: studyIconGraph,
      color: '#AD91FF',
    },
    legend: {
      icon: studyIconLegend,
      color: '#AD91FF',
    },
    table: {
      icon: studyIconTable,
      color: '#AD91FF',
    },
  },
  {
    tag: 'Category',
    value: 'clinical_trial',
    node: {
      color: '#00A0BA',
      background: '#043F55',
    },
    graph: {
      icon: clinicalTrialIconGraph,
      color: '#1C75BC',
    },
    legend: {
      icon: clinicalTrialIconLegend,
      color: '#1C75BC',
    },
    table: {
      icon: clinicalTrialIconTable,
      color: '#1C75BC',
    },
  },
  {
    tag: 'Category',
    value: 'case',
    node: {
      color: '#FF7E14',
      background: '#672900',
    },
    graph: {
      icon: caseIconGraph,
      color: '#FF7F15',
    },
    legend: {
      icon: caseIconLegend,
      color: '#FF7F15',
    },
    table: {
      icon: caseIconTable,
      color: '#FF7F15',
    },
  },
  {
    tag: 'Category',
    value: 'biospecimen',
    node: {
      color: '#00785A',
      background: '#063126',
    },
    graph: {
      icon: biospecimenIconGraph,
      color: '#28AE60',
    },
    legend: {
      icon: biospecimenIconLegend,
      color: '#28AE60',
    },
    table: {
      icon: biospecimenIconTable,
      color: '#28AE60',
    },
  },
  {
    tag: 'Category',
    value: 'clinical',
    node: {
      color: '#1C75BB',
      background: '#073A61',
    },
    graph: {
      icon: clinicalIconGraph,
      color: '#05B8EE',
    },
    legend: {
      icon: clinicalIconLegend,
      color: '#05B8EE',
    },
    table: {
      icon: clinicalIconTable,
      color: '#05B8EE',
    },
  },
  {
    tag: 'Category',
    value: 'data_file',
    node: {
      color: '#00AC0E',
      background: '#023806',
    },
    graph: {
      icon: dataFileIconGraph,
      color: '#7EC500',
    },
    legend: {
      icon: dataFileIconLegend,
      color: '#7EC500',
    },
    table: {
      icon: dataFileIconTable,
      color: '#7EC500',
    },
  },
  {
    tag: 'Category',
    value: 'metadata_file',
    node: {
      color: '#F4B940',
    },
    graph: {
      color: '#F4B940',
    },
  },
  {
    tag: 'Category',
    value: 'analysis',
    node: {
      color: '#B533A9',
      background: '#6F0065',
    },
    graph: {
      icon: analysisIconGraph,
      color: '#FF7ABC',
    },
    legend: {
      icon: analysisIconLegend,
      color: '#FF7ABC',
    },
    table: {
      icon: analysisIconTable,
      color: '#FF7ABC',
    },
  }
];


export const defaultCategory = {
  icon: IconDefault,
  color: '#9B9B9B',
};

