# Momence task — Makefile

REGISTRY := registry.nesty.top
PUSH_REGISTRY := 192.168.1.61:5000
VERSION := latest
IMAGE := $(REGISTRY)/momence-task:$(VERSION)

.PHONY: image
image:
	podman build -t $(IMAGE) .
	podman push --tls-verify=false $(IMAGE) docker://$(PUSH_REGISTRY)/momence-task:$(VERSION)
