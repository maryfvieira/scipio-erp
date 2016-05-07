<#--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<#include "customercommon.ftl">

<#-- Cato: NOTE: fields duplicated from old checkout custsettings.ftl -->
<#-- FIXME: these only source from parameters map, need more fallbacks/sources... -->

    <@personalTitleField name="${fieldNamePrefix}personalTitle" label=uiLabelMap.CommonTitle />

    <@field type="input" name="${fieldNamePrefix}firstName" value=(parameters["${fieldNamePrefix}firstName"]!) required=true label=uiLabelMap.PartyFirstName/>
    <@field type="input" name="${fieldNamePrefix}middleName" value=(parameters["${fieldNamePrefix}middleName"]!) label=uiLabelMap.PartyMiddleInitial/>
    <@field type="input" name="${fieldNamePrefix}lastName" value=(parameters["${fieldNamePrefix}lastName"]!) required=true label=uiLabelMap.PartyLastName/>
    <@field type="input" name="${fieldNamePrefix}suffix" value=(parameters["${fieldNamePrefix}suffix"]!) label=uiLabelMap.PartySuffix containerClass="+${styles.field_extra!}"/>

    <input type="hidden" name="${fieldNamePrefix}homePhoneContactMechId" value="${parameters["${fieldNamePrefix}homePhoneContactMechId"]!}"/>
    <@telecomNumberField label=uiLabelMap.PartyHomePhone required=true 
        countryCodeName="${fieldNamePrefix}homeCountryCode" areaCodeName="${fieldNamePrefix}homeAreaCode" contactNumberName="${fieldNamePrefix}homeContactNumber" extensionName="${fieldNamePrefix}homeExt">
      <@fields type="default-compact" ignoreParentField=true>
        <@allowSolicitationField name="${fieldNamePrefix}homeSol" allowSolicitation="" containerClass="+${styles.field_extra!}" />
      </@fields>
    </@telecomNumberField>

    <input type="hidden" name="${fieldNamePrefix}workPhoneContactMechId" value="${parameters["${fieldNamePrefix}workPhoneContactMechId"]!}"/>
    <@telecomNumberField label=uiLabelMap.PartyBusinessPhone required=false containerClass="+${styles.field_extra!}"
        countryCodeName="${fieldNamePrefix}workCountryCode" areaCodeName="${fieldNamePrefix}workAreaCode" contactNumberName="${fieldNamePrefix}workContactNumber" extensionName="${fieldNamePrefix}workExt">
      <@fields type="default-compact" ignoreParentField=true>
        <@allowSolicitationField name="${fieldNamePrefix}workSol" allowSolicitation="" />
      </@fields>
    </@telecomNumberField>

    <input type="hidden" name="${fieldNamePrefix}emailContactMechId" value="${parameters["${fieldNamePrefix}emailContactMechId"]!}"/>
    <@field type="generic" label=uiLabelMap.PartyEmailAddress required=true>
      <@field type="input" name="${fieldNamePrefix}emailAddress" value=(parameters["${fieldNamePrefix}emailAddress"]!) required=true />
    
      <@fields type="default-compact" ignoreParentField=true>
        <@allowSolicitationField name="${fieldNamePrefix}emailSol" allowSolicitation="" />
      </@fields>
    </@field>

