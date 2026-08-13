#!/usr/bin/env python3
"""Richer original looping beds: sea, palm, lamp, night insects."""
import math
import os
import random
import struct
import subprocess
import wave

SR = 44100
SECS = 24
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "sound")


def clamp(x):
    return max(-1.0, min(1.0, x))


def write_wav(path, samples):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with wave.open(path, "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(b"".join(struct.pack("<h", int(clamp(s) * 32767)) for s in samples))


def fade(samples, ms=800):
    n = int(SR * ms / 1000)
    for i in range(n):
        samples[i] *= i / n
        samples[-1 - i] *= i / n
    return samples


def sea():
    rng = random.Random(7)
    out = []
    brown = 0.0
    pink = 0.0
    for i in range(SR * SECS):
        white = rng.uniform(-1, 1)
        brown = (brown + white * 0.02) * 0.988
        pink = pink * 0.97 + white * 0.03
        t = i / SR
        swell = 0.55 + 0.45 * math.sin(2 * math.pi * 0.06 * t)
        swell *= 0.85 + 0.15 * math.sin(2 * math.pi * 0.013 * t)
        foam = pink * (0.12 + 0.08 * max(0, math.sin(2 * math.pi * 0.09 * t)))
        undertow = math.sin(2 * math.pi * 0.16 * t) * 0.05
        out.append((brown * 1.8 + foam + undertow) * swell * 0.48)
    return fade(out)


def palm():
    rng = random.Random(11)
    n = SR * SECS
    out = [0.0] * n
    for i in range(n):
        t = i / SR
        gust = 0.3 + 0.7 * (0.5 + 0.5 * math.sin(2 * math.pi * 0.09 * t + math.sin(t * 0.4)))
        rustle = rng.uniform(-1, 1)
        if i:
            rustle = rustle * 0.45 + out[i - 1] * 0.18
        tick = rng.uniform(-1, 1) * 0.04 if rng.random() < 0.02 else 0
        out[i] = (rustle * 0.22 + tick) * gust
    return fade(out)


def lamp():
    rng = random.Random(3)
    out = []
    for i in range(SR * SECS):
        t = i / SR
        hiss = rng.uniform(-1, 1) * 0.028
        if i:
            hiss = hiss * 0.35 + out[-1] * 0.4
        flicker = 0.82 + 0.18 * math.sin(2 * math.pi * 1.7 * t) * math.sin(2 * math.pi * 0.23 * t)
        low = math.sin(2 * math.pi * 58 * t) * 0.008
        out.append((hiss + low) * flicker)
    return fade(out, 900)


def insects():
    rng = random.Random(19)
    n = SR * SECS
    out = [0.0] * n
    # night air
    brown = 0.0
    for i in range(n):
        brown = (brown + rng.uniform(-1, 1) * 0.01) * 0.99
        out[i] = brown * 0.06
    t = 0
    while t < n:
        gap = int(SR * rng.uniform(0.12, 0.7))
        chirp_len = int(SR * rng.uniform(0.035, 0.11))
        freq = rng.uniform(3200, 6800)
        amp = rng.uniform(0.045, 0.09)
        for i in range(chirp_len):
            idx = t + i
            if idx >= n:
                break
            env = math.sin(math.pi * i / chirp_len)
            wobble = 1 + 0.04 * math.sin(2 * math.pi * 18 * i / SR)
            out[idx] += math.sin(2 * math.pi * freq * wobble * i / SR) * env * amp
        t += gap + chirp_len
    # slow cricket pulse
    pulse = int(SR * 0.55)
    for k in range(0, n, pulse):
        for i in range(int(SR * 0.03)):
            idx = k + i
            if idx >= n:
                break
            env = math.sin(math.pi * i / max(1, int(SR * 0.03)))
            out[idx] += math.sin(2 * math.pi * 4100 * i / SR) * env * 0.035
    return fade(out, 700)


def to_ogg(wav, ogg):
    subprocess.check_call(
        ["ffmpeg", "-y", "-i", wav, "-c:a", "libvorbis", "-q:a", "5", ogg],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    os.remove(wav)


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in (("sea", sea), ("palm", palm), ("lamp", lamp), ("insects", insects)):
        wav = os.path.join(OUT, f"{name}.wav")
        ogg = os.path.join(OUT, f"{name}.ogg")
        write_wav(wav, fn())
        to_ogg(wav, ogg)
        print(name, os.path.getsize(ogg))


if __name__ == "__main__":
    main()
