FROM docker.io/archlinux:base-devel
RUN pacman-key --init
RUN pacman -Syu --noconfirm npm
WORKDIR /usr/dev
ENTRYPOINT /bin/bash
