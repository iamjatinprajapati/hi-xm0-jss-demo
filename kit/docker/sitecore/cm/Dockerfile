# escape=`

ARG BASE_IMAGE
ARG SPE_IMAGE
ARG TOOLING_IMAGE
# ARG SOLUTION_IMAGE
#ARG_SXA_IMAGE
#ARG_SMS_IMAGE
#ARG_HEADLESS_IMAGE

# FROM ${SOLUTION_IMAGE} as solution
FROM ${TOOLING_IMAGE} as tooling
FROM ${SPE_IMAGE} as spe
#FROM_SXA_IMAGE
#FROM_SMS_IMAGE
#FROM_HEADLESS_IMAGE
FROM ${BASE_IMAGE}


SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

# Copy development tools and entrypoint
COPY --from=tooling \tools\ \tools\

WORKDIR C:\inetpub\wwwroot

#Sms_Module

# Add SPE module
COPY --from=spe \module\cm\content .\
# RUN Rename-Item -Path "c:\inetpub\wwwroot\App_Config\Include\Spe\Spe.IdentityServer.config.disabled" -NewName "Spe.IdentityServer.config"

#SXA_Module

#Headless_Module

# Copy solution website files
# COPY --from=solution \artifacts\website\ .\

# Copy solution transforms
# COPY --from=solution \artifacts\transforms\ \transforms\solution\

# Copy role transforms
# COPY .\transforms\ \transforms\role\

# Perform role transforms
# RUN C:\tools\scripts\Invoke-XdtTransform.ps1 -Path .\ -XdtPath C:\transforms\role